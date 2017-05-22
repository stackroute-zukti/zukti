let express = require('express');
let router = express.Router();
const RegisteredUser = require('../../models/user');

//@Pavithra.N :to add assessment details in mongodb
 router.post('/add', function(req, res) {
        var authType=req.body.authType;
        var email=req.body.id;
        var currentScore=Number(req.body.score);
        var totalQuestionsAttempted=Number(req.body.totalQuestionsAttempted);
        var noOfFluke=Number(req.body.noOfFluke);
        var str=authType+'.email';
        var set = {$set: {}};
        var query = {};
        query[str] = email;
        var detail={};
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
          RegisteredUser.update(query, set , function(err,success) {
             if (err) {
                 res.send(err);
             }
             else {
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
                     detail["rank"]=rank;
                     if(prevRank!=rank)
                     {
                         updateRank(prevRank,rank,authType);
                         updateRank1(email,rank,authType);
                     }
                     res.send(detail);
                  });//end of finding users greater than currentScore
              });//end of finding rank by comparing score with other users
        }//end of else
       });//end of update
    });//end of find
    });//end of function

    //for updating rank for all users
    function updateRank(prevRank,currentRank,authType){
      if(prevRank<currentRank)//do -1
      {
      for(let i=prevRank+1;i<=currentRank;i++)
      {
        //updating rank for local user
         RegisteredUser.update({'local.assessment.rank' :i},{'$set' : {'local.assessment.rank' : i-1}},function(err,success){
            if(err)
            {
              console.log(err);
            }
           console.log(success);
         });
         RegisteredUser.update({'google.assessment.rank' :i}, {'$set' : {'google.assessment.rank' : i-1}},function(err,success){
            if(err)
            {
              console.log(err);
            }
            console.log(success);
          });
          RegisteredUser.update({'facebook.assessment.rank' :i}, {'$set' : {'facebook.assessment.rank' : i-1}},function(err,user){
            if(err)
            {
               console.log(err);
            }
            console.log(user);
          });
     }//end of for
  }//end of if
  if(prevRank>currentRank)//do +1
      {
      for(let i=currentRank;i<prevRank;i++)
      {
         RegisteredUser.update({'local.assessment.rank' :i}, {'$set' : {'local.assessment.rank' : i+1}},function(err,success){
            if(err)
            {
              console.log(err);
            }
            console.log(success);
          });
         RegisteredUser.update({'google.assessment.rank' :i}, {'$set' : {'google.assessment.rank' : i+1}},function(err,success){
            if(err)
            {
              console.log(err);
            }
            console.log(success);
          });
          RegisteredUser.update({'facebook.assessment.rank' :i}, {'$set' : {'facebook.assessment.rank' : i+1}},function(err,success){
             if(err)
             {
                console.log(err);
             }
            console.log(success);
          });
    }//end of for
  }//end of if\
}
//for updating rank for the user who is loggedin
function updateRank1(email,rank,authType)
{
    var query1 = {};
    var str1=authType+'.email';
    query1[str1] = email;
    var set1 = {$set: {}};
    set1.$set[authType+'.assessment.rank'] = rank;
    RegisteredUser.update(query1,set1,function(err,success)
    {
      if(err)
      {
        console.log(err);
      }
      console.log(success);
    });
}







module.exports = router;
