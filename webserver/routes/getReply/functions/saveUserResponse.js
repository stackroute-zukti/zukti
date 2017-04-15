let UserChatHistory = require('../../../models/userChatHistory');
let User = require('./../../../models/user');
// @Deepika : To update the user response in db
module.exports = function(email, type, answer, liked, disliked) {

    let newObject = [];

    User.findOne({
        $or: [
            {
                'local.email': email
            }, {
                'google.email': email
            }, {
                'facebook.email': email
            }
        ]
    }, function(err, data) {
        if (err) {
            console.log(err);
        } else {
            UserChatHistory.findOne({
                email: email
            }, function(err1, records) {
                if(err1) {
                  console.log(err1);
                } else {
                  records.chats[0].answerObj.map(function(answerItem, index) {
                    if(answerItem[type]) {
                      /* eslint-disable */
                      answerItem[type].map(function(item, ind) {
                        if(item.value === answer) {
                          item.likes = liked;
                          item.dislikes = disliked;
                        }
                      });
                    }
                    /* eslint-enable */
                    newObject.push(answerItem);
                  });

                  UserChatHistory.findOneAndUpdate({
                    email: email
                  }, {
                    $set: {'chats.0.answerObj': newObject }
                  }, function(err2, result) {
                    if(err2) {
                      console.log(err2);
                    } else {
                      console.log('final', result);
                    }
                  });
                }
            });
        }
    });
};
