let getNeo4jDriver = require('../../../neo4j/connection');

module.exports = function(resultCallback) {
    // get all intent which have same_as to themselves these are our baseIntents
    let query = 'match(n:concept)-[:subconcept]->(m:concept) return  distinct collect(n.name)';
    let session = getNeo4jDriver().session();

    session.run(query)
        .then((result) => {
            // Completed!
            session.close();
            resultCallback(result.records[0]._fields[0]);
        })
        .catch((error) => {
            console.log(error);
        });
};
