let getNeo4jDriver = require('../../../neo4j/connection');
let log4js = require('log4js');
let logger = log4js.getLogger();
module.exports = function(resultCallback,domain,keyword) {
    // get all intent which have same_as to themselves these are our baseIntents
    if(domain=='react')
    {
    let domain_arr=[];
    let concept=[];
    //let subConcept=[];
    //let question=[];
    let answer=[];
    console.log(domain);
    //let query = 'MATCH (d:domain {name:"'+domain+'"})-[:concept_of]-(c:concept)-[:definition]-(q:question)-[:answer_of]->(a:text) where d.name="'+keyword+'" or c.name="'+keyword+'" return d.name,c.name,a.value';
    let query = 'MATCH (d:domain {name:"'+domain+'"})-[:concept_of]-(c:concept)-[:article]-(a:article) where d.name="'+keyword+'" or c.name="'+keyword+'" return d.name,c.name,a.value';
    let session = getNeo4jDriver().session();

    session.run(query)
        .then((result) => {
            //Completed!
            session.close();
             for(let i=0;i<result.records.length;i++)
              {
                for(let j=0;j<result.records[i]._fields.length;j++)
                  {
                    if(j==0)
                    domain_arr.push(result.records[i]._fields[j])
                    else if(j==1)
                concept.push(result.records[i]._fields[j]);
                // else if(j==2)
                // subConcept.push(result.records[i]._fields[j]);
                // else if(j==3)
                // question.push(result.records[i]._fields[j]);
                else
                answer.push(result.records[i]._fields[j]);
              }
              }
              resultCallback(domain_arr,concept,answer);
        })
        .catch((error) => {
            logger.debug(error);
        });
      }
      else {
        let concept=[];
        let query = 'match(n:concept)<-[:subconcept_of]-(m:concept)<-[:part_of]-(s)<-[:subconcept_of]-(d) <-[q]-(n1:question)-[r:answer]->(a:text) where n.name="'+domain+'" return distinct a.value';
        let session = getNeo4jDriver().session();
        session.run(query)
            .then((result) => {
                //Completed!
                session.close();
                 for(let i=0;i<result.records.length;i++)
                  {
                    concept.push(result.records[i]._fields[0]);
                  }
                  resultCallback(concept);
            })
            .catch((error) => {
                logger.debug(error);
            });
      }
};
