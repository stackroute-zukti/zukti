var dbClient = require('mongodb').MongoClient;

var _db;

module.exports = {
    connectToServer: function(callback) {
        dbClient.connect('mongodb://localhost:27017/acl', function(err, db) {

            _db = db;
            return callback(err);
            //  }
        })
    },
    getDb: function() {
        return _db;
    }

};
