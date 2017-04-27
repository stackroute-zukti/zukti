let neo4j = require('neo4j-driver').v1;
module.exports = function() {

<<<<<<< HEAD
let driver = neo4j.driver("bolt://192.168.1.106", neo4j.auth.basic('neo4j', 'neo4js'));
=======
let driver = neo4j.driver("bolt://192.168.1.10", neo4j.auth.basic('neo4j', 'neo4js'));
>>>>>>> 36793d2e2833daed0904787f4a756e8d07743ba3
    return driver;
};
