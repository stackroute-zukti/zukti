let express = require('express');
let router = express.Router();
const RegisteredUser = require('../../models/user');
router.post('/add', function(req, res) {
	console.log('!@#$%^&*()_');
        var authType=req.body.authType;
        var email=req.body.id;
        var currentScore=Number(req.body.score);
        var totalQuestionsAttempted=Number(req.body.totalQuestionsAttempted);
        var noOfFluke=Number(req.body.noOfFluke);
        var str=authType+'.email';
        var set = {$set: {}};
        var query = {};
        query[str] = email;
        RegisteredUser.find(query, function(err, user)
        {
          var prevScore=user[0][authType].assessment.score;
          var prevQuestions=user[0][authType].assessment.totalQuestionsAttempted;
          var prevNoOfFluke=user[0][authType].assessment.noOfFluke;
          var prevRank=user[0][authType].assessment.rank;
          currentScore=prevScore+currentScore;
          totalQuestionsAttempted=totalQuestionsAttempted+prevQuestions;
          noOfFluke=noOfFluke+prevNoOfFluke;
          var fluke=(noOfFluke/totalQuestionsAttempted)*100;
          set.$set[authType+'.assessment.score'] = currentScore;
          set.$set[authType+'.assessment.totalQuestionsAttempted'] = totalQuestionsAttempted;
          set.$set[authType+'.assessment.fluke'] = fluke;
          set.$set[authType+'.assessment.noOfFluke'] = noOfFluke;
          var rank=1;
         RegisteredUser.update(query, set , function(err) {
             if (err) {
                 res.send(err);
             }
             else {
                console.log("success");
                console.log(currentScore);
                RegisteredUser.find({$or: [
                   {$and: [{'google.assessment.score':currentScore}, {'google.assessment.fluke':  { $lt :fluke}}]},
                   {$and: [{'local.assessment.score':currentScore}, {'local.assessment.fluke':  { $lt :fluke}}]},
                   {$and: [{'facebook.assessment.score':currentScore}, {'facebook.assessment.fluke':  { $lt :fluke}}]}
                  ]},function(err,user)
                  {
                  rank=rank+user.length;
                  RegisteredUser.find({$or: [{'google.assessment.score':{ $gt :currentScore}},{'local.assessment.score':{ $gt :currentScore}},{'facebook.assessment.score':{ $gt :currentScore}}]},function(err,user)
                   {
                     rank=rank+user.length;
                     // updateRank(prevRank,rank);
                  });//end of finding users greater than currentScore
              });//end of finding rank by comparing score with other users
        }//end of else
       });//end of update
    });//end of find
    });







module.exports = router;