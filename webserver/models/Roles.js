var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var aclroles = new Schema({role: String});

module.exports = mongoose.model('aclroles', aclroles);
