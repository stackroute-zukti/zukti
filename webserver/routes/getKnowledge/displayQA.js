let getNeo4jDriver = require('../../neo4j/connection');

module.exports = function(resultCallback) {
    // get all intent which have same_as to themselves these are our baseIntents
    let query = 'MATCH (n:question)-[r:answer ]->(a) RETURN n.value,COLLECT(Labels(a)+a.value)';
    let session = getNeo4jDriver().session();

    session.run(query)
        .then((result) => {
            session.close();
            resultCallback(result.records);
        })
        .catch((error) => {
            console.log(error);
        });
};
