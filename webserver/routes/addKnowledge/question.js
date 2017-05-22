let express = require('express');
let saveQuestionAnswer = require('./saveQuestionAnswer');
let processQuestion = require('./processQuestion');
let voteAnswer = require('./voteAnswer');
let router = express.Router();
let client = require('./redis');

function get_user_id(req, response) {
    // Since numbers are not supported by node_acl in this case, convert
    //  them to strings, so we can use IDs nonetheless.
console.log("request in analytsics",req.user);

    return req.user._id.toString() || false;
}

// router to verify input question has keyword or not
router.post('/verifyQuestion', function(req, res) {
  global.acl.isAllowed(get_user_id(req, res), '/verifyQuestion', 'post', function(err, allowed) {
        if (err) {
            console.log(err);
        } else if (allowed === false) {
            res.send({'success': 'not authenticated'});
        } else {
    let question = req.body.question;
    lexicon();
    let keywordLexicon = [];
    let intentLexicon = [];
    let log4js = require('log4js');
    let logger = log4js.getLogger();
    /* @yuvashree: fetching intents and lexicons from redis */
    function lexicon()
    {
      client.hkeys('keywords', function(err, reply) {
          keywordLexicon = reply;
      });
      client.hkeys('intents', function(err, reply) {
          intentLexicon = reply;
          callBack();
      });
    }

    /* @yuvashree: call back to process the question */
    function callBack()
    {
    let questionInfo = processQuestion(question,keywordLexicon,intentLexicon);
    logger.debug(questionInfo.keywords+",,,,,,,,,typed now");
        if (questionInfo.keywords.length === 0) {
        res.json({
            isValidQuestion: false,
            errorMessage: 'The question must have a keyword'
        });
    }
    else if (questionInfo.intents.length === 0) {
        res.json({
            isValidQuestion: false,
            errorMessage: 'The question must have an intent'
        });
      }
    else{
      res.json({isValidQuestion: true});
    }
  }
}//end of else
});//end of acl
});//end of route
// router to add a question answer set to Ginni knowledge base
router.post('/addQuestionAnswer', function(req, res) {
  global.acl.isAllowed(get_user_id(req, res), '/addQuestionAnswer', 'post', function(err, allowed) {
        if (err) {
            console.log(err);
        } else if (allowed === false) {
            res.send({'success': 'not authenticated'});
        } else {
    // callback when a new question answer will be created
    let questionsAnswerSavedCallback = function(id) {
        // unique id given to each questionsAnswerSet
        res.json({
            id: id
        });
    };
    // function call to save question and answer in neo4j database
    saveQuestionAnswer(req, questionsAnswerSavedCallback);
  }//end of else
});//end of acl
});//end of route
  // router to rate answer which user liked
router.post('/rateAnswer', function(req, res) {
  global.acl.isAllowed(get_user_id(req, res), '/rateAnswer', 'post', function(err, allowed) {
        if (err) {
            console.log(err);
        } else if (allowed === false) {
            res.send({'success': 'not authenticated'});
        } else {
  let action = req.body.action;
  let type = req.body.type;
  let value = req.body.value;
  let user = req.body.email;
  // method to save user preference in neo4j
  voteAnswer(action, type, value, user);
  res.send('done');
}//end of else
});//end of acl
});//end of route
module.exports = router;
