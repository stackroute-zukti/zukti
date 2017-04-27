let getNeo4jDriver = require('../../../neo4j/connection');
let log4js = require('log4js');
let logger = log4js.getLogger();
module.exports = function(resultCallback,domain) {
    // get all intent which have same_as to themselves these are our baseIntents
    var query;
    if(domain==='react'){
        query='MATCH (m:concept {name:"'+domain+'"})<-[:subconcept_of]-(n)<-[:subconcept_of]-(sn) return collect (distinct sn.name)'
    }
    else if(domain==='design pattern'){
        query='match(n:concept)<-[:subconcept_of]-(m:concept)<-[:part_of]-(s)<-[:subconcept_of]-(d) where n.name="'+domain+'" return  distinct collect(d.name)'
    }
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
};
