var express = require('express');
var app = express.Router();
var UserSchema = require('../../models/user');
var RoleDb = require('../../models/Roles');

function isloggedIn(req, res, next) {
    if (req.user) {
        console.log("user router", req.user);
        next();
    } else {
        res.redirect('/login');
    }
}

//actual routes

app.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
app.post('/getResources', function(req, res, next) {
    var data = require('../../../Testaclroles.json');
    console.log("data read", data);
    console.log("role got", req.body.role);
    for (let i = 0; i < data.length; i++) {
        if (req.body.role == data[i].roles) {
            res.send(data[i].allows);
        }
    }

});
app.get('/getnewemail', function(req, res, next) {
    UserSchema.find({}, function(err, data) {
        console.log("inside function find err", err + "data ", data);
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            console.log("data ", data);
            res.send(data)
        }
    })
})
app.get('/getroles', function(req, res, next) {
    RoleDb.find({}, function(err, data) {
        if (err) {
            console.log("error", err);
            res.send(err)
        } else {
            console.log("data", data);
            res.send(data)
        }
    });
});
//for updating roles to user
app.post('/updateUserRole', function(req, res, next) {
    console.log("req.body", req.body);
    if (req.body.authType == "google") {
        UserSchema.update({
            "google.email": req.body.email
        }, {
            $set: {
                "google.role": req.body.role
            }
        }, function(err, data) {
            if (err) {

                res.send('Not updated');
            } else {
                UserSchema.find({}, function(err, user) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("data user", user)
                        const readline = require('readline');
                        const fs = require('fs');
                        fs.writeFileSync('Id_Roles.json', JSON.stringify(user));
                    }
                }); //end of find
                res.send('updated');
            }
        }
);  //end of update
    } //end of googleif
else if (req.body.authType == "local") {
        UserSchema.update({
            "local.email": req.body.email
        }, {
            $set: {
                "local.role": req.body.role
            }
        }, function(err, data) {
            if (err) {

                res.send('Not updated');
            } else {
                UserSchema.find({}, function(err, user) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("data user", user)
                        const readline = require('readline');
                        const fs = require('fs');
                        fs.writeFileSync('Id_Roles.json', JSON.stringify(user));
                    }
                }); //end of find
                res.send('updated');
            }
        }); //end of update
    } else if (req.body.authType == "facebook") {
        UserSchema.update({
            "facebook.email": req.body.email
        }, {
            $set: {
                "facebook.role": req.body.role
            }
        }, function(err, data) {
            if (err) {

                res.send('Not updated');
            } else {
                UserSchema.find({}, function(err, user) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log("data user", user)
                        const readline = require('readline');
                        const fs = require('fs');
                        fs.writeFileSync('Id_Roles.json', JSON.stringify(user));
                    }
                }); //end of find
                res.send('updated');
            }
        }); //end of update
    }

});//end of update

app.post('/addrolestodb', function(req, res, next) {
var rolesdb = new RoleDb(req.body);
rolesdb.save(function(err, data) {
    if (err) {

        res.send(err)
    } else {

        res.send(data);
    }
})
});

app.get('/getuser', function(req, res, next) {
UserSchema.find({}, function(err, data) {
    if (data) {

        res.send(data)
    }
})
});
// router.get('/status', function(req, res) {
//     acl.userRoles(get_user_id(req, res), function(err, roles) {
//         res.send('User:' + JSON.stringify(req.user) + 'Roles: ' + JSON.stringify(roles));
//     });
// });

app.post('/add', function(req, res, next) {

global.acl.isAllowed(get_user_id(req, res), '/stream/add', 'post', function(err, allowed) {
    if (err) {
        console.log(err);
    } else if (allowed === false) {
        res.send({'success': 'not authenticated'});
    } else {

        var movie = new Movie(req.body);
        movie.save(function(err, data) {
            if (err)
                res.send({'success': 'Not Saved'});
            else
                res.send({'success': 'SAVED'});
            }
        );
    }

});

});

// db.users.update({ "_id" : ObjectId("58ef15d91838b54953dd769f")},{$set :{"localType" : "Admin"}})

app.get('/display', isloggedIn, function(req, res, next) {
Movie.find({}, function(err, data) {
    if (err)
        res.send(err);
    else {
        res.send(data);
    }
});
});

app.put('/update', isloggedIn, function(req, res, next) {
Movie.update({
    _id: req.body.id
}, {
    $set: {
        comments: req.body.comments
    }
}, function(err, data) {
    if (err)
        res.send({'success': 'Not updated'});
    else {
        res.send({'success': 'updated'});
    }
})
});

app.delete('/delete', function(req, res, next) {

global.acl.isAllowed(get_user_id(req, res), '/stream/delete', 'delete', function(err, allowed) {
    if (err) {
        console.log(err);
    } else if (allowed === false) {
        res.send({'success': 'not authenticated'});
    } else {

        Movie.remove({
            _id: req.body.id
        }, function(err, data) {
            if (err)
                res.send({'success': 'Not deleted'});
            else {
                res.send({'success': 'deleted'});
            }
        });
    } //end of else
}); //end of acl
}); //end of routes
// Only for users and higher

app.use('/status', function(request, response) {
acl.userRoles(get_user_id(request, response), function(error, roles) {
    response.send('User: ' + JSON.stringify(request.user) + ' Roles: ' + JSON.stringify(roles));
});
});

app.get('/secret', function(req, res, next) {

global.acl.isAllowed(get_user_id(req, res), '/stream/secret', '*', function(err, allowed) {
    if (err) {
        console.log(err);
    } else if (allowed === false) {
        console.log("false allowed");
    } else {
        console.log("allowed");
    }

});
res.send("getting");
});
app.get('/topsecret', function(req, res) {
global.acl.isAllowed(get_user_id(req, res), '/stream/topsecret', '*', function(err, allowed) {
    if (err) {
        console.log(err);
    } else if (allowed === false) {
        console.log("false allowed");
    } else {
        console.log("allowed");
    }

});
res.send("getting");
});
function get_user_id(request, response) {
// Since numbers are not supported by node_acl in this case, convert
//  them to strings, so we can use IDs nonetheless.
console.log("request", request);
return request.user.id.toString() || false;
}
module.exports = app;
