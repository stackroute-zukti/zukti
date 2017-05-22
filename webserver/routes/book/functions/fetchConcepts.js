let getNeo4jDriver = require('../../../neo4j/connection');
let log4js = require('log4js');
let logger = log4js.getLogger();
module.exports = function(resultCallback,domain) {

  //#sindhuja filter concepts based on domain
    // get all intent which have same_as to themselves these are our baseIntents
    if(domain=='react')
    {
      let arr=[];
    let query = 'MATCH (d:domain)-[:concept_of]-(c:concept) where d.name="'+domain+'" return collect (distinct c.name)';
    // get all intent which have same_as to themselves these are our baseIntents
    let session = getNeo4jDriver().session();

    session.run(query)
        .then((result) => {
            // Completed!
            session.close();
            // for(let i=0;i<result.records.length;i++)
            //   {
                //arr.push(result.records[0]._fields[0]);
            resultCallback(result.records[0]._fields[0]);
        //  }
        })
        .catch((error) => {
            logger.debug(error);
        });
      }
      else {
        let query = 'match(n:concept)<-[:subconcept_of]-(m:concept)<-[:part_of]-(s)<-[:subconcept_of]-(d) where n.name="'+domain+'" return  distinct collect(d.name)';
        let session = getNeo4jDriver().session();

        session.run(query)
            .then((result) => {
                // Completed!
                session.close();

                resultCallback(result.records[0]._fields[0]);
            })
            .catch((error) => {
                logger.debug(error);
            });
      }
};
