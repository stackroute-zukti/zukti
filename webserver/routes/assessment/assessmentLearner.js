let getNeo4jDriver = require('../../neo4j/connection');
let log4js = require('log4js');
let logger = log4js.getLogger();
let express = require('express');
let router = express.Router();

//@Pavithra.N :to store assessment details in graph(node:testdetails)
router.post('/setLearnerDetails',function(req,res){
  console.log(req.body.emailid);
	console.log("inside setLearnerDetails");
	let query = 'match (a: learner { emailid:"'+req.body.id+'"}) \
	create(b:testdetails {score:'+req.body.score+',rank:'+req.body.rank+',fluke:'+req.body.fluke+', attendedques:'+req.body.attendedques+'}) ,\
	(a)-[:testdetails {time:"'+req.body.time+'",date:"'+req.body.date+'"}]->(b) ';
	let session = getNeo4jDriver().session();
	session.run(query).then(function(result){
		res.send(result);
		session.close();
	});
});

//@Pavithra.N :to retrieve assessment details in particular date
router.post('/getLearnerDetails',function(req,res){
  // use switch case  give range based on your need
	console.log("getLearnerDetails");
  let query = 'match (a:learner { emailid:"'+req.body.email+'"})-[:testdetails {date:"'+req.body.date+'"}]->(b:testdetails) return b';
  let session = getNeo4jDriver().session();
  session.run(query).then(function(result){
		console.log(result);
  	res.send(result);
  	session.close();
  });
});

//@Pavithra.N :to store assessment details in graph
router.post('/setUserAttemptedDetails',function(req,res){
  var correct=JSON.parse(req.body.correctquestion);
  var wrong=JSON.parse(req.body.wrongquestion);
  for(let i=0;i<correct.length;i++)
  {
    var qid=correct[i];
    let query = 'match (a:learner { emailid:"'+req.body.emailid+'"}), \
    (b:testquestion) where ID(b)='+qid+'\
    create (a)-[:attempted_by{type:"correct"}]->(b)';
    let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
    	session.close();
      });
  }
  for(let i=0;i<wrong.length;i++)
  {
    var qid=wrong[i];
    let query = 'match (a:learner { emailid:"'+req.body.emailid+'"}), \
    (b:testquestion) where ID(b)='+qid+'\
    create (a)-[:attempted_by{type:"wrong"}]->(b)';
    let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      session.close();
      });
  }
  res.send("success");
});

module.exports=router;
