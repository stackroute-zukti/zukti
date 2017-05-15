/* @sangeetha: neo4j to select siblings */
let getNeo4jDriver = require('../../../neo4j/connection');
let log4js = require('log4js');
let logger = log4js.getLogger();
module.exports = function(keywords, callBack) {
  // logger.debug(keywords+".....1st line");
    let query = `UNWIND ${JSON.stringify(keywords)} AS token
               MATCH(n:concept)-[:concept_of]->(parent:concept)
               WHERE n.name= token
               MATCH (parent)<-[:concept_of]-(child:concept)
               MATCH (child)-[:same_as]-(child)
               RETURN COLLECT(child.name)`;

    let session = getNeo4jDriver().session();
    session.run(query).then(function(response) {
      session.close();
      let siblings = [];
      response.records.forEach((record) => {
        // logger.debug(record._fields+"...1st time");
        let field = record._fields;
        siblings = field.map(function(value)
        {
          return value;
        });
      });
    //  logger.debug(siblings+"........siblings");
      callBack(siblings);
    }).catch(function(error) {
      logger.debug(error);
      return {};
    });
};
