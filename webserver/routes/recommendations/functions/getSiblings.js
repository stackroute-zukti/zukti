/* @sangeetha: neo4j to select siblings */
let getNeo4jDriver = require('../../../neo4j/connection');

module.exports = function(keywords, callBack) {
  // console.log(keywords+".....1st line");
    let query = `UNWIND ${JSON.stringify(keywords)} AS token
               MATCH(n:concept)-[:part_of|subconcept|actor_of]->(parent:concept)
               WHERE n.name= token
               MATCH (parent)<-[:part_of|subconcept|actor_of]-(child:concept)
               RETURN COLLECT(child.name)`;

    let session = getNeo4jDriver().session();
    session.run(query).then(function(response) {
      session.close();
      let siblings = [];
      response.records.forEach((record) => {
        // console.log(record._fields+"...1st time");
        let field = record._fields;
        siblings = field.map(function(value)
        {
          return value;
        });
      });
    //  console.log(siblings+"........siblings");
      callBack(siblings);
    }).catch(function(error) {
      console.log(error);
      return {};
    });
};
