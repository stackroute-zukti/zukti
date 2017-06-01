let express = require('express');
let router = express.Router();
let getNeo4jDriver = require('../../neo4j/connection');

// To get TestDomain in DropDown
router.get('/getTestDomain',function(req,res){
  let query = 'MATCH(n:domain) RETURN COLLECT ( distinct n.name)AS domain';
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      res.send(result.records[0]);
      session.close();
          });
});

// To get TestConcept in DropDown based on testDomain
router.post('/getTestConcept',function(req,res){
  let query = 'Match (n:domain)-[:concept_of]-(b)\
   where n.name="'+req.body.TestDomainvalue+'" \
   return collect (b.name) as tconcept';
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      res.send(result.records[0]);
      session.close();
          });
});


// To get TestQuestion details based on testquestion
router.post('/getTestQdetails',function(req,res){
  let query = 'Match (n:testquestion) where n.question="'+req.body.TestQuestion+'" \
  return collect (n.question) as q,collect (n.answer) as tanswer,\
  collect (n.hint) as hint,collect (n.option) as options,collect (n.type) as type';
  console.log("in router",query);
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      res.send(result.records[0]);
      session.close();
          });
});

// To set TestQuestion details in Edit-TestQuestion based on testquestion
router.post('/setTestQdetails',function(req,res){
  console.log(req.body.testanswer);
  let query = 'Match (n:testquestion) where n.question="'+req.body.TestQuestion+'" \
  set n.answer='+JSON.stringify(req.body.testanswer)+',n.option='+ JSON.stringify(req.body.testoptions)+', \
  n.hint="'+req.body.testhint+'",\
  n.question="'+req.body.testquestion+'"';
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      res.send("result");
      session.close();
          });
});

//To delete testquestion in Edit-TestQuestion
router.post('/deleteTestQdetails',function(req,res){
  let query = 'Match (n:testquestion) where n.question="'+req.body.TestQuestion+'" detach delete n';
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      res.send("result");
      session.close();
          });
});

// To get TestQuestion in DropDown based on testDomain and TestConcept
router.post('/getTestQuestion',function(req,res){
  let query = 'Match (n:domain)-[:concept_of]-(b:concept)-[:testquestion]->(c:testquestion)\
   where n.name="'+req.body.TestDomainvalue+'"  and b.name="'+req.body.TestConceptvalue+'"\
   return collect (c.question) as question';
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      res.send(result.records[0]);
      session.close();
          });
});

// Router to create TestDomain
router.post('/createTestDomain',function(req,res){
  let query = 'match (n:assesment) \
  merge (a:domain {name:"'+req.body.newTestDomain+'"}) create (n)-[:domain]->(a)';
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      session.close();
      res.send(result);
          });
});

// Router to create TestConcept
router.post('/createTestConcept',function(req,res){
  let query = 'match (n:domain {name:"'+req.body.TestDomain+'"}) \
  create(a:concept {name:"'+req.body.TestConcept+'"}) ,(n)-[:concept]->(a)';
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      session.close();
      res.send("ok");
          });
});

// Router to create TestQuestions with Options,hint,answer
router.post('/createTestQuestions',function(req,res){
  let query = 'match (d:domain {name:"'+req.body.TestDomain+'"}),\
  (a:concept {name:"'+req.body.TestConcept+'"})\
  merge (c:testquestion {question:"'+req.body.TestQuestion+'",\
   option: '+ JSON.stringify(req.body.Testoptions)+',\
   answer:'+JSON.stringify(req.body.TestAnswer)+',MAQ:"'+req.body.MAQ+'",\
  hint:"'+req.body.TestHint+'"})\
  create(a)-[:testquestion]->(c)';
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      res.send(result);
      session.close();
          });
});


module.exports = router;
