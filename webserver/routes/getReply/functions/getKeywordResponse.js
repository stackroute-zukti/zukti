// function to take keywords and return response from neo4j database
let getNeo4jDriver = require('../../../neo4j/connection');
let answerNotFoundReply = require('../../../config/answerNotFoundReply');
let replyForKeyword = require('../../../config/replyForKeyword.json');
let User = require('./../../../models/user');

module.exports = function(keywords, email, types, sendResponse, flag, correctedQuestion) {
    /* @yuvashree: find domain from db using email id */
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
        // query to extract data
        /* @yuvashree: modified query for multiple relationships and different domain for normal question */
        if (types.length === 0) {
            query = `UNWIND ${JSON.stringify(keywords)} AS token
                 MATCH (n:concept)
                 WHERE n.name = token
                 OPTIONAL MATCH (n)-[r:same_as]->(main)
                 WITH COLLECT(main) AS baseWords
                 UNWIND baseWords AS token
                 MATCH p=(token)-[:part_of|:subconcept|:actor_of|:same_as*]->(:concept{name:'${domain}'})
                 WITH length(p) AS max,baseWords AS baseWords
                 UNWIND baseWords AS bw
                 match p=(bw)-[:part_of|:subconcept|:actor_of|:same_as*]->(:concept{name:'${domain/* @yuvashree: modified query for multiple relationships and different domain for type specific question */}'})
                 WHERE length(p) = max
                 WITH bw as bw
                 MATCH (n)<-[rel:answer]-(q:question)-->(bw) where n:blog or n:video or n:image
                 WITH bw as bw,n as n ,rel as rel
                 ORDER BY rel.rating DESC
                 RETURN LABELS(n)as contentType ,COLLECT(distinct n.value) `;
        } else {
            query = `UNWIND ${JSON.stringify(types)} AS token
              MATCH (n:type)
              WHERE n.name = token
              OPTIONAL MATCH (n)-[r:same_as]->(main)
              WITH  LAST(COLLECT(main.name)) AS type
              UNWIND ${JSON.stringify(keywords)} AS token
               MATCH (n:concept)
               WHERE n.name = token
               OPTIONAL MATCH (n)-[r:same_as]->(main)
               WITH COLLECT(main) AS baseWords, type as type
               UNWIND baseWords AS token
               MATCH p=(token)-[:part_of|:subconcept|:actor_of|:same_as*]->(:concept{name:'${domain}'})
               WITH length(p) AS max,baseWords AS baseWords,type as type
               UNWIND baseWords AS bw
               match p=(bw)-[:part_of|:subconcept|:actor_of|:same_as*]->(:concept{name:'${domain}'})
               WHERE length(p) = max
               WITH bw as bw,type as type
               MATCH (n)<-[rel:answer]-(q:question)-->(bw) where labels(n) = type
               WITH bw as bw,n as n ,rel as rel
               ORDER BY rel.rating DESC
               RETURN LABELS(n)as contentType ,COLLECT(distinct n.value) `;
             }
        let session = getNeo4jDriver().session();
        session.run(query).then(function(result) {
            // Completed!
            session.close();
            // condition to handle when no result is found
            if (result.records[0] === 0) {
                // randomly generating answer and send response
                let foundNoAnswer = answerNotFoundReply[Math.floor(Math.random() * answerNotFoundReply.length)];
                let resultArray = [];
                let resultObj = {};
                resultObj.value = foundNoAnswer;
                resultObj.time = new Date().toLocaleString();
                resultArray.push(resultObj);
                sendResponse(true, resultArray);
            } else {
                let hasAtleastSomeContent = false;
                let resultArray = [];
                let resultObj = {};
                result.records.forEach((record) => {
                    let field = record._fields;
                    let contentType = field[0][0];
                    let content = field[1];
                    if (content.length !== 0) {
                        hasAtleastSomeContent = true;
                        resultObj[contentType] = content;
                    }
                });
                resultObj.time = new Date().toLocaleString();
                if (hasAtleastSomeContent) {
                  //  @Mayanka: If spell check done show this message
                    if (flag == 1) {
                        resultObj.value = 'Showing results for : ' +
                            "\"" + correctedQuestion + "\"" + ' instead';
                    }
                  //  @Mayanka: no matching keyword found
                    else {
                        resultObj.value = replyForKeyword[Math.floor(Math.random() * replyForKeyword.length)];
                    }
                    resultArray.push(resultObj);
                    resultObj.keywordResponse = true;
                    sendResponse(true, resultArray);
                } else {
                    resultObj.value = answerNotFoundReply[Math.floor(Math.random() * answerNotFoundReply.length)];
                    resultArray.push(resultObj);
                    sendResponse(true, resultArray);
                }
            }
        }).catch(function(error) {
            console.log(error);
        });
    });
};
