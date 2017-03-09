// to save unanswered Query
let UnansweredQuery = require('../../../models/unansweredQuery');
module.exports = function(username, email, question, keywords, intents) {
    let unansweredQuery = new UnansweredQuery();
    unansweredQuery.user = email;
    unansweredQuery.username = username;
    unansweredQuery.question = question;
    unansweredQuery.keywords = keywords;
    unansweredQuery.intents = intents;
    unansweredQuery.save((error) => {
        if (error) {
            console.log(error);
        } else {
            console.log('saved ' + question);
        }
    });
};
