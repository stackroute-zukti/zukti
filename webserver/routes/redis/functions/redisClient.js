/* @navinprasad: create redis client */
let redis = require('redis').createClient('8888', '127.0.0.1');
module.exports = redis;
