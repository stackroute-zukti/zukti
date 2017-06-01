let express = require('express');
let router = express.Router();
let getNeo4jDriver = require('../../neo4j/connection');
var countcorrect = [];
var countwrong = [];
var array1 = [];
var array2 = [];

//@pavithra.n :to fetch the questions from ne04j
router.post('/getAssesmentQuestion', function(req, res) {
    console.log("inside getAssesmentQuestion");
    let query = 'match (n:domain {name:"' + req.body.domain + '"})<-[:concept_of]-(b:concept)-[*]->(j:testquestion{MAQ:"false"})\
  return collect (distinct j) as question,id(j)';
    let session = getNeo4jDriver().session();
    var question = [];
    session.run(query).then(function(result) {
        for (let i = 0; i < result.records.length; i++) {
            var obj = {};
            var answer = result.records[i]._fields["0"]["0"].properties.answer;
            var option = result.records[i]._fields["0"]["0"].properties.option;
            var MAQ=result.records[i]._fields["0"]["0"].properties.MAQ;
            var correct = [];
            obj["question"] = result.records[i]._fields["0"]["0"].properties.question;
            obj["answers"] = option;
            for(let j=0;j<answer.length;j++)
            {
              correct.push(option.indexOf(answer[j]))
            }
            obj["correct"] = correct;
            obj["id"] = result.records[i]._fields["0"]["0"].identity.low;
            obj["MAQ"]=MAQ;
            question.push(obj);
        }
        res.send(question);
        session.close();
    });
});
//@Pavithra.n:to calculate the difficulty level of the questions
router.post('/setDifficulty', function(req, res) {
    countcorrect = [];
    countwrong = [];
    var correct = JSON.parse(req.body.correctquestion);
    array1 = correct;
    var wrong = JSON.parse(req.body.wrongquestion);
    array2 = wrong;
    let query = 'unwind [ ' + correct + ' ]as count\
         match(n:testquestion)-[b:attempted_by{type:"correct"}]-(c)where ID(n)=count\
         with collect(count) as on\
         return collect( on);';

    let session = getNeo4jDriver().session();
    session.run(query).then(function(result) {
        for (let i = 0; i < result.records["0"]._fields["0"]["0"].length; i++) {
            countcorrect.push(result.records["0"]._fields["0"]["0"][i].low);
        }
        session.close();
    });
    let query1 = 'unwind [ ' + wrong + ' ]as count\
           match(n:testquestion)-[b:attempted_by{type:"wrong"}]-(c)where ID(n)=count\
           with collect(count) as on\
           return collect( on);';

    session.run(query1).then(function(result) {
        for (let i = 0; i < result.records["0"]._fields["0"]["0"].length; i++) {
            countwrong.push(result.records["0"]._fields["0"]["0"][i].low);
        }
        session.close();
    });
    res.send("success");
});

//@Pavithra.n:to update the difficulty level of the questions
router.get('/setDifficulty', function(req, res) {
    var difficulty = 1;
    for (let i = 0; i < array1.length; i++) {
        var count1 = countcorrect.reduce(function(n, val) {
            return n + (val === array1[i]);
        }, 0);
        var count2 = countwrong.reduce(function(n, val) {
            return n + (val === array1[i]);
        }, 0);
        var total = count1 + count2;
        var diff = (count1 / total) * 100;
        if (diff >= 90) {
            difficulty = 1;
        }
        if (diff < 90 && diff >= 80) {
            difficulty = 2;
        }
        if (diff < 80 && diff >= 70) {
            difficulty = 3;
        }
        if (diff < 70 && diff >= 50) {
            difficulty = 4;
        }
        if (diff < 50) {
            difficulty = 5;
        }

        let session = getNeo4jDriver().session();
        let query1 = 'MATCH (n:testquestion) where ID(n)=' + array1[i] + ' set n.difficulty =' + difficulty + ' return n';
        session.run(query1).then(function(result) {
            console.log(result);
            session.close();
        });
    }
    for (let i = 0; i < array2.length; i++) {
        var count1 = countcorrect.reduce(function(n, val) {
            return n + (val === array2[i]);
        }, 0);
        var count2 = countwrong.reduce(function(n, val) {
            return n + (val === array2[i]);
        }, 0);
        var total = count1 + count2;
        var diff = (count1 / total) * 100;

        console.log("wrong percentage", diff);
        if (diff >= 90) {
            difficulty= 1;
        }
        if (diff < 90 && diff >= 80) {
            difficulty = 2;
        }
        if (diff < 80 && diff >= 70) {
            difficulty = 3;
        }
        if (diff < 70 && diff >= 50) {
            difficulty = 4;
        }
        if (diff < 50) {
            difficulty= 5;
        }

        let session = getNeo4jDriver().session();
        let query1 = 'MATCH (n:testquestion) where ID(n)=' + array2[i] + ' set n.difficulty =' + difficulty+ ' return n';
        session.run(query1).then(function(result) {
            console.log(result);
            session.close();
        });
    }
});

module.exports = router;
