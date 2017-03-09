let path = require('path');
let webpack = require('webpack');
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');
let config = require('./webpack.config');
let retriveChat = require('./webserver/routes/retriveChats/chats');
let getLexicon = require('./webserver/lexicon/getLexicon');
let intent = require('./webserver/routes/intent/intent');
let addKnowledge = require('./webserver/routes/addKnowledge/question');
let askQuestion = require('./webserver/routes/getReply/reply');
let getAdmin = require('./webserver/routes/getAdmin/getadminUser');
let savebroadcastmessage = require('./webserver/routes/broadcastmessage/broadcastmessage');
let getbroadcastmessage = require('./webserver/routes/broadcastmessage/getbroadcastmessage');
let getKnowledge = require('./webserver/routes/getKnowledge/getKnowledgeBase');
let analytics = require('./webserver/routes/analyticsData/analytics');
let bookmarks = require('./webserver/routes/bookmarks/bookmarks');
let concept = require('./webserver/routes/concept/concept');

/* @ramvignesh: requiring the user route */
let user = require('./webserver/routes/user/user');

let app = express();
let compiler = webpack(config);

const configDB = require('./webserver/config/database');
const requestAuthenticate = require('./webserver/middleware/requestAuthenticate');
const uploadimage = require('./webserver/routes/uploadimage');


let isAuthenticated = function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/#/');
};

// Mongoose
// pass passport for configuration
require('./webserver/config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', express.static(path.join(__dirname, './webclient/')));

// get all lexicon terms from neo4j and save it a json file in lexicon folder
getLexicon();

// Mongoose
mongoose.connect(configDB.url);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('connnected with mongo');
});

// required for passport
app.use(session({
    secret: 'dfsdfd',
    // session secret
    resave: true,
    saveUninitialized: true
}));
// use connect-flash for flash messages stored in session
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


// dummy protected routes

app.get('/secret', requestAuthenticate, function(req, res) {
    res.json(req.decoded);
});
// load our routes and pass in our app and fully configured passport
require('./webserver/routes/auth.js')(app, passport);

// our routes will be given here
// login routes
// Routes -- version 1
app.use('/', uploadimage);
app.use('/analytics', analytics);
app.use('/savebroadcastmessage', isAuthenticated, savebroadcastmessage);
app.use('/getbroadcastmessage', isAuthenticated, getbroadcastmessage);
app.use('/getadmin', isAuthenticated, getAdmin);
app.use('/intent', intent);
app.use('/concept', concept);
app.use('/question', isAuthenticated, askQuestion);
app.use('/retriveChat', isAuthenticated, retriveChat);
app.use('/qa', addKnowledge);
app.use('/question', askQuestion);
app.use('/getknowledge', getKnowledge);
app.use('/retriveChat', retriveChat);
app.use('/bookmarks', bookmarks);

// Routes -- version 2

/* @ramvignesh: route to set user's current domain */
app.use('/user', user);

/* @keerthana: route to test graph */
app.get('/graphie', function(req, res) {
    res.sendfile('graph.html');
});

app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000
    }
}));

app.use(webpackHotMiddleware(compiler));
// Listening to port 8080
let server = app.listen(8080, '0.0.0.0', function(err, result) {
    if (err) {
        console.error("Error ", err);
    }
    console.log("Server started at 8080");
});
let io = require('socket.io')(server);
// socket.io demo
io.on('connection', function(socket) {
    socket.emit('server event', {
        foo: 'bar'
    });
    socket.on('newQuery', function(data) {
      socket.broadcast.emit('incrementQueryCount', data);
    });
    socket.on('userLoginStatus', function(data) {
      socket.broadcast.emit('userLoggedIncount', data);
    });

    socket.on('client event', function(data) {
        socket.broadcast.emit('update label', data);
    });

    // v2
    socket.on('updateUserList', function() {
      socket.broadcast.emit('update userlist');
    });

    // @keerthana:Listening sentiment socket
    socket.on('sentiment', function(data) {
        socket.broadcast.emit('sentiment score', data);
    });

});
