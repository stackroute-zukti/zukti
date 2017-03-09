let getNeo4jDriver = require('./../../neo4j/connection');
let processQuestion = require('./processQuestion');
let getLexicon = require('../../lexicon/getLexicon');
module.exports = function(req, questionsAnswerSavedCallback) {

    //  let query = `CREATE (a:answer {textAnswer:'',videoAnswer:'',blogAnswer:'',CodeSnippetAnswer:''})
    //               return ID(a)`;
    let question = req.body.question;
    let blogs = req.body.blogs;
    let texts = req.body.texts;
    let videos = req.body.videos;
    let questionInfo = processQuestion(question);
    let keywords = questionInfo.keywords;
    let intents = questionInfo.intents;
    let mainIntent = intents[intents.length - 1];
    let blogsQuery = '';
    let textsQuery = '';
    let videoQuery = '';

    console.log(keywords);
    console.log(question);
    blogs.forEach((item) => {
        let blog = item.trim();
        if (blog != '') {
            blogsQuery = blogsQuery + `MERGE (q)-[:answer {rating:0}]-> (:blog {value:${JSON.stringify(blog)}}) `;
        }
    });
    videos.forEach((item) => {
        let video = item.trim();
        if (video != '') {
            videoQuery = videoQuery + `MERGE (q)-[:answer {rating:0}]-> (:video {value:${JSON.stringify(video)}}) `;
        }
    });
    texts.forEach((item) => {
        let text = item.trim();
        if (text != '') {
            textsQuery = textsQuery + `MERGE (q)-[:answer {rating:0}]-> (:text {value:${JSON.stringify(text)}}) `;
        }
    });

    console.log(mainIntent);
    /* @yuvashree: added code to fetch the base intent to create a new question and answer */
    let query1 = `MATCH (n:intent) where n.name='${mainIntent}'
                  OPTIONAL MATCH(n)-[:same_as]->(main)
                  WITH LAST(COLLECT(main.name)) AS intent
                  return intent`

    let domain = 'design pattern';

    let session = getNeo4jDriver().session();
    session.run(query1).then(function(result) {
        mainIntent = result.records[0]._fields[0];
        // Completed!
        console.log('inside checkIntent: ', mainIntent);

        let session1 = getNeo4jDriver().session();
        /* @yuvashree: modified query for multiple relationships and different domain */
        let query = ` UNWIND ${JSON.stringify(keywords)}  as token
                          MATCH (n:concept)
                          WHERE n.name = token
                          OPTIONAL MATCH (n)-[r:same_as]->(main)
                          WITH COLLECT(main) AS baseWords
                          UNWIND baseWords AS token
                          MATCH p=(token)-[:part_of|:subconcept|:actor_of|:same_as*]->(:concept{name:'${domain}'})
                          WITH length(p) AS max,baseWords AS baseWords
                          UNWIND baseWords AS bw
                          MATCH p=(token)-[:part_of|:subconcept|:actor_of|:same_as*]->(:concept{name:'${domain}'})
                          WHERE length(p) = max WITH COLLECT(bw) AS bws
                          UNWIND bws AS keywords
                          MERGE (q:question {value:${JSON.stringify(question)}})-[:${mainIntent}]->(keywords)
                          ${blogsQuery} ${videoQuery} ${textsQuery}
                          RETURN 1`

        session1.run(query).then(function(result) {
            // Completed!
            session1.close();
            console.log(query);
            console.log("here" + result);
            questionsAnswerSavedCallback(1);
        }).catch(function(error) {
            console.log(error);
        });

        session.close();
        console.log(query1);
        console.log(result);
    }).catch(function(error) {
        console.log(error);
        return error;
    });

};
