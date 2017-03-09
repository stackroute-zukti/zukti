let express = require('express');
let saveQuestionAnswer = require('./saveQuestionAnswer');
let processQuestion = require('./processQuestion');
let voteAnswer = require('./voteAnswer');
let router = express.Router();

// router to verify input question has keyword or not
router.post('/verifyQuestion', function(req, res) {
    let question = req.body.question;
    let questionInfo = processQuestion(question);
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
});
// router to add a question answer set to Ginni knowledge base
router.post('/addQuestionAnswer', function(req, res) {
    // callback when a new question answer will be created
    let questionsAnswerSavedCallback = function(id) {
        // unique id given to each questionsAnswerSet
        res.json({
            id: id
        });
    };
    // function call to save question and answer in neo4j database
    saveQuestionAnswer(req, questionsAnswerSavedCallback);
});
  // router to rate answer which user liked
router.post('/rateAnswer', function(req, res) {
  let liked = req.body.liked;
  let type = req.body.type;
  let value = req.body.value;
  // method to save user preference in neo4j
  voteAnswer(liked, type, value);
  if(liked === true) {
    res.send('liked');
  }
  else {
    res.send('disliked');
  }
});
module.exports = router;
