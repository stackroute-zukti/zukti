let neo4j = require('neo4j-driver').v1;
module.exports = function() {

<<<<<<< HEAD
let driver = neo4j.driver("bolt://172.23.239.194", neo4j.auth.basic('neo4j', 'admin'));
    return driver;
};
