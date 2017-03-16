'use strict';
let express = require('express');
let path = require('path');
let morgan = require('morgan');
let mongoose = require('mongoose');
let configDB = require('./config/database');
let config = require('../webpack.config');
let getLexicons = require('./lexicon/getLexicons');

function createApp() {
    let app = express();
    return app;
}

function setupStaticRoutes(app) {
    console.log('inside service setupStaticRoutes...');
    app.use(express.static(path.resolve(__dirname, '../', 'webclient')));
    return app;
}

function setupZuktiRoutes(app) {
    console.log('inside service setupZuktiRoutes...');

    let isAuthenticated = function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/#/');
    };

    console.log('getLexicons called...');
    // getLexicons();
    getLexicons();
    // setupRedisStore();
    console.log('setting up zukti routes...');
    app.use('/', require('./routes/uploadimage'));
    app.use('/analytics', require('./routes/analyticsData/analytics'));
    app.use('/savebroadcastmessage', isAuthenticated,
    require('./routes/broadcastmessage/broadcastmessage'));
    app.use('/getbroadcastmessage', isAuthenticated,
    require('./routes/broadcastmessage/getbroadcastmessage'));
    app.use('/getadmin', isAuthenticated, require('./routes/getAdmin/getadminUser'));
    app.use('/intent', require('./routes/intent/intent'));
    app.use('/concept', require('./routes/concept/concept'));
    app.use('/question', isAuthenticated, require('./routes/getReply/reply'));
    app.use('/retriveChat', isAuthenticated, require('./routes/retriveChats/chats'));
    app.use('/qa', require('./routes/addKnowledge/question'));
    app.use('/question', require('./routes/getReply/reply'));
    app.use('/getknowledge', require('./routes/getKnowledge/getKnowledgeBase'));
    app.use('/retriveChat', require('./routes/retriveChats/chats'));
    app.use('/bookmarks', require('./routes/bookmarks/bookmarks'));
    /* @ramvignesh: route to set user's current domain */
    app.use('/user', require('./routes/user/user'));
    // app.use('/redis', require('./routes/redis/redis'));
    /* @keerthana: route to test graph */
    app.get('/graphie', function(req, res) {
        res.sendfile('graph.html');
    });

    return app;
}

function setupMiddlewares(app) {
    console.log('inside service setupMiddlewares...');
    let passport = require('passport');
    let bodyParser = require('body-parser');
    let requestAuthenticate = require('./middleware/requestAuthenticate');
    let flash = require('connect-flash');
    let session = require('express-session');

    require('./config/passport')(passport);

    //  for logging each requests
    app.use(morgan('dev'));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    //  required for passport
    app.use(session({
        secret: 'dfsdfd',
        // session secret
        resave: true,
        saveUninitialized: true
    }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());

    // app.use(require('express-session')({secret: 'accesskey'}));
    app.get('/secret', requestAuthenticate, function(req, res) {
        res.json(req.decoded);
    });

    require('./routes/auth.js')(app, passport);

    let compression = require('compression');
    app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Method', 'GET,POST,PUT,DELETE');
        res.header('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        next();
    });

    return app;
}

function setupWebpack(app) {
    console.log('inside service setupWebpack...');

    if (configDB.NODE_ENV !== 'production') {
        const webpack = require('webpack');
        const webpackDevMiddleware = require('webpack-dev-middleware');
        const webpackHotMiddleware = require('webpack-hot-middleware');
        const webpackConfig = require('../webpack.config.js');
        const webpackCompiler = webpack(webpackConfig);
        app.use(webpackHotMiddleware(webpackCompiler));
        app.use(webpackDevMiddleware(webpackCompiler, {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath,
            stats: {
                colors: true
            },
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            }
        }));
    }
    return app;
}

function setupMongooseConnections() {
  console.log('inside service setupMongooseConnections...');

    mongoose.connect(configDB.url);

    let db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function() {
        console.log('connected with mongo');
    });
}

// function setupRedisStore() {
//   console.log('inside service setupRedisStore...');
//   let getLexicons = require('./lexicon/getLexicons');
//   getLexicons();
// }

// app constructor function is exported
module.exports = {
    createApp,
    setupStaticRoutes,
    setupZuktiRoutes,
    setupMiddlewares,
    setupMongooseConnections,
    // setupRedisStore,
    setupWebpack
};
