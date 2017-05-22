let express = require('express');
let router = express.Router();
let getNeo4jDriver = require('../../neo4j/connection');


// To get TestDomain in DropDown
router.get('/getTestDomain',function(req,res){
  let query = 'MATCH(n:testdomain) RETURN COLLECT ( distinct n.name)AS domain';
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      res.send(result.records[0]);
      session.close();
          });
});

// To get TestConcept in DropDown based on testDomain
router.post('/getTestConcept',function(req,res){
  let query = 'Match (n:testdomain)-[:testconcept]->(b) where n.name="'+req.body.TestDomainvalue+'" return collect (b.name) as tconcept';
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      res.send(result.records[0]);
      session.close();
          });
});

// Router to create TestDomain
router.post('/createTestDomain',function(req,res){
  let query = 'match (n:assesment) \
  merge (a:testdomain {name:"'+req.body.newTestDomain+'"}) create (n)-[:testdomain]->(a)';
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      session.close();
      res.send(result);
          });
});

// Router to create TestConcept
router.post('/createTestConcept',function(req,res){
  let query = 'match (n:testdomain {name:"'+req.body.TestDomain+'"}) \
  create(a:testconcept {name:"'+req.body.TestConcept+'"}) ,(n)-[:testconcept]->(a)';
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      session.close();
      res.send("ok");
          });
});

// Router to create TestQuestions with Options,hint,answer
router.post('/createTestQuestions',function(req,res){
  let query = 'match (d:testdomain {name:"'+req.body.TestDomain+'"}),\
  (a:testconcept {name:"'+req.body.TestConcept+'"})\
  create (c:testquestion {question:"'+req.body.TestQuestion+'",\
   option:"['+req.body.TestOptions+']",\
   answer:"'+req.body.TestAnswer+'",type:'+req.body.TestType+',\
  hint:"'+req.body.TestHint+'"}),\
  (a)-[:testquestion]->(c)';
  let session = getNeo4jDriver().session();
    session.run(query).then(function(result){
      res.send(result);
      session.close();
          });
});

module.exports = router;
