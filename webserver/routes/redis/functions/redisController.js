/* @navinprasad: redis controller */
let fetchIntents = require('./getIntents');
let log4js = require('log4js');
let logger = log4js.getLogger();
function getIntents()
{
  return fetchIntents();
}

module.exports = {
  getIntents: getIntents
};
