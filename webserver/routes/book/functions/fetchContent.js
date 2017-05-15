let getNeo4jDriver = require('../../../neo4j/connection');
let log4js = require('log4js');
let logger = log4js.getLogger();
module.exports = function(resultCallback,domain) {
    // get all intent which have same_as to themselves these are our baseIntents
    if(domain=='react')
    {
    let concept=[];
    console.log(domain);
    let query = 'MATCH (d:domain {name:"'+domain+'"})-[:subconcept_of]-(c:concept)-[:subconcept_of]-(c1:concept)<-[q]-(n:question)-[r:answer]->(a:text)  RETURN distinct n.value,a.value';
    let session = getNeo4jDriver().session();

    session.run(query)
        .then((result) => {
            //Completed!
            session.close();
             for(let i=0;i<result.records.length;i++)
              {
                for(let j=0;j<result.records[i]._fields.length;j++)
                  {
                concept.push(result.records[i]._fields[j]);
              }
              }
              resultCallback(concept);
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
