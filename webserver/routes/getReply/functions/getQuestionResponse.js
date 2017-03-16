let Cookie = require('react-cookie');
// get response of the question asked by user from neo4j database
let getNeo4jDriver = require('../../../neo4j/connection');
let User = require('./../../../models/user');
let client = require('./redis');

module.exports = function(intents, keywords, email, types, answerFoundCallback, noAnswerFoundCallback, flag, correctedQuestion) {
    /* @yuvashree: find domain from db using email id */
    console.log('flag in que'+flag);
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
    }, function(error, data) {
        if (error) {
            return error;
        }
        let domain = data.local.loggedinDomain;
        let query = '';
        let intent = '';
        let type = '';
        let keyword = '';
        let count = 0;
        getIntent();
        /* @navinprasad: find the base node */
        function getIntent()
        {
          if(types.length === 0)
          {
            client.hmget('intents', intents[intents.length-1],function(err, reply) {
            console.log(reply);
            intent = reply;
            intentCallBack(intent);
            });
          }
          else {
            client.hmget('types', types[types.length-1],function(err, reply) {
            console.log(reply);
            type = reply;
            });
            client.hmget('intents', intents[intents.length-1],function(err, reply) {
            console.log(reply);
            intent = reply;
            intentCallBack(intent);
            });
          }
      }
        function intentCallBack(intent)
        {
        if (types.length === 0) {
        /* @yuvashree: modified query for multiple relationships and different domain for normal question */
          console.log('here');
            query = `UNWIND ${JSON.stringify(keywords)} AS token
            MATCH (n:concept)
            WHERE n.name = token
            OPTIONAL MATCH (n)-[r:same_as]->(main)
            WITH COLLECT(main) AS baseWords
            UNWIND baseWords AS token
            MATCH p=(token)-[:part_of|:subconcept|:actor_of|:same_as*]->(:concept{name:'${domain}'})
            WITH length(p) AS max,baseWords AS baseWords
            UNWIND baseWords AS bw
            match p=(bw)-[:part_of|:subconcept|:actor_of|:same_as*]->(:concept{name:'${domain}'})
            WHERE length(p) = max WITH COLLECT(bw) AS bws
            UNWIND bws AS keywords
            OPTIONAL MATCH (keywords)<-[r]-(q:question)-[rel:answer]->(a)
            WHERE TYPE(r)='${intent[0]}'
            WITH a as a, rel as rel,keywords as keywords
            OPTIONAL MATCH  (keywords)<-[subconcept]-(c:concept)
            WHERE TYPE(subconcept)='${intent[0]}'
            WITH a as a, c as c
            RETURN LABELS(a),COLLECT(distinct a.value),LABELS(c),COLLECT(distinct c.name) `;
        }
          /* @yuvashree: modified query for multiple relationships and different domain for type specific question */
          else {
            query = `UNWIND ${JSON.stringify(keywords)} AS token
              MATCH (n:concept)
              WHERE n.name = token
              OPTIONAL MATCH (n)-[r:same_as]->(main)
              WITH COLLECT(main) AS baseWords
              UNWIND baseWords AS token
              MATCH p=(token)-[:part_of|:subconcept|:actor_of|:same_as*]->(:concept{name:'${domain}'})
              WITH length(p) AS max,baseWords AS baseWords
              UNWIND baseWords AS bw
              match p=(bw)-[:part_of|:subconcept|:actor_of|:same_as*]->(:concept{name:'${domain}'})
              WHERE length(p) = max WITH COLLECT(bw) AS bws
              UNWIND bws AS keywords
              MATCH (keywords)<-[r]-(q:question)-[rel:answer]->(a)
              WHERE TYPE(r)='${intent[0]}' and labels(a)='${type[0]}'
              WITH a as a, rel as rel
              RETURN LABELS(a),COLLECT(a.value) `
        }
        let session = getNeo4jDriver().session();
        session.run(query).then(function(result) {
            // Completed!
            session.close();
            //  @Mayanka: No records found
            if (result.records.length === 0) {
              /* @Sindhujaadevi: To find if the question is from different domain or not */
            client.hmget('keywords', keywords[keywords.length-1],function(err, reply) {
            keyword = reply;
            if (domain !== keyword) {
                      noAnswerFoundCallback(keyword, true);
                  }
            else{
                      noAnswerFoundCallback(keyword, false);
                }
            });

          } else {
                let answerObj = {};
            // @sangeetha : recommendations keywords  for QuestionResponse
                answerObj.keywords = keywords;
                answerObj.time = new Date().toLocaleString();
                //  @Mayanka: If spell check done show this message
                if (flag == 1) {
                    answerObj.extras = 'Showing results for : ' +
                        "\"" + correctedQuestion + "\"" + ' instead';
                }

                let resultArray = result.records.forEach((record) => {
                    let field = record._fields;
                    if(field[0] !== null)
                    {
                      answerObj[field[0][0]] = field[1].map((value, index) => {
                      if (value !== '') {
                          return {value: value};
                      }
                  });
                }
                else {
                  if(field[2] !== null)
                  {
                  field[3] = {
                    value:field[3].join(",")
                  }
                  console.log(field[2][0]);
                  answerObj[field[2][0]] = field[3];
                }
                else {
                  count = 1;
                  /* @vibakar & Threka : calling noAnswerFoundCallback for fetching answer from stackoverflow,
                                          when answer is not found in our db */
                  noAnswerFoundCallback();
                }
                }
              });
                // sending the answer to callback
                if(count == 0)
                answerFoundCallback(answerObj);
            }
        }).catch(function(error) {
            console.log(error);
        });
      }
    });
};
