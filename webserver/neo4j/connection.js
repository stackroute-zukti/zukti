let neo4j = require('neo4j-driver').v1;
module.exports = function() {

<<<<<<< HEAD
<<<<<<< HEAD
let driver = neo4j.driver("bolt://192.168.1.209", neo4j.auth.basic('neo4j', 'neo4js'));
=======
let driver = neo4j.driver("bolt://192.168.1.106", neo4j.auth.basic('neo4j', 'neo4js'));
>>>>>>> c140f30a3e08eb5216153d3b980cefb1a4b61624
=======
let driver = neo4j.driver("bolt://192.168.1.10", neo4j.auth.basic('neo4j', 'neo4js'));
>>>>>>> 36793d2e2833daed0904787f4a756e8d07743ba3
    return driver;
};
