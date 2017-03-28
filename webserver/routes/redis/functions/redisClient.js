/* @navinprasad: create redis client */
let redis = require('redis').createClient('6380', '127.0.0.1');
module.exports = redis;
