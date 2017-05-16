let neo4j = require('neo4j-driver').v1;
module.exports = function() {

let driver = neo4j.driver("bolt://172.23.239.179", neo4j.auth.basic('neo4j', 'admin'));
    return driver;
};
