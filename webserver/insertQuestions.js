/*@santhosh: upload csv to add question and answers to neo4j graph */
const fs = require('fs');
const rl = require('readline');
// let driver = require(__dirname + './neo4j/connection');
let neo4j = require('neo4j-driver').v1;

let driver = neo4j.driver('bolt://172.23.239.182', neo4j.auth.basic('neo4j', 'admin'));

let log4js = require('log4js');
let logger = log4js.getLogger();
 module.exports = function(name) {
    let lineNumber = 0;
    logger.debug('upload csv: '+ name);
    let rd = rl.createInterface({
        input: fs.createReadStream(__dirname + './CsvFiles/' + name),
        // output: process.stdout,
        terminal: false
    });

    let session = driver.session();
    rd.on('line', function(data) {
        lineNumber = lineNumber + 1;
        let linearr = data.split(/,(?=(?:(?:[^']*'){2})*[^']*$)/);
        if (lineNumber !== 1 && linearr[3] !== null) {
            if (linearr[8] !== '') {
                let query = `match (n:${linearr[0]} {id:${linearr[1]}})
                 merge (q:question{value:'${linearr[4]}'}) merge (q)-[:${linearr[3]}]->(n)
                 merge (i:image{value:'${linearr[8]}',
                 likes: [], dislikes: []}) merge (q)-[:answer]->(i)`;
                session.run(query).then(function(result) {
                    session.close();
                    driver.close();
                }).catch(function(error) {
                    driver.close();
                });
            } else {
                if (linearr[5].length > 1) {
                    let query = `match (n:${linearr[0]} {id:${linearr[1]}})
                    merge (q:question{value:'${linearr[4]}'}) merge (q)-[:${linearr[3]}]->(n)
                    merge (t:text{value:'${linearr[5]}',
                    likes: [], dislikes: []}) merge (q)-[:answer{rating:0}]->(t)`;
                    session.run(query).then(function(result) {
                        session.close();
                        driver.close();
                    }).catch(function(error) {
                        driver.close();
                    });
                }
                if (linearr[6].length > 1) {
                    let query = `match (n:${linearr[0]} {id:${linearr[1]}})
                    merge (q:question{value:'${linearr[4]}'}) merge (q)-[:${linearr[3]}]->(n)
                    merge (b:blog{value:'${linearr[6]}',
                    likes: [], dislikes: []}) merge (q)-[:answer{rating:0}]->(b)`;
                    session.run(query).then(function(result) {
                        session.close();
                        driver.close();
                    }).catch(function(error) {
                        driver.close();
                    });
                }
                if (linearr[7].length > 1) {
                    let query = `match (n:${linearr[0]} {id:${linearr[1]}})
                    merge (q:question{value:'${linearr[4]}'})   merge (q)-[:${linearr[3]}]->(n)
                    merge (v:video{value:'${linearr[7]}',
                    likes: [], dislikes: []}) merge (q)-[:answer{rating:0}]->(v)`;
                    session.run(query).then(function(result) {
                        session.close();
                        driver.close();
                    }).catch(function(error) {
                        driver.close();
                    });
                }
            }
        }
    });

    rd.on('close', function() {});
 };
