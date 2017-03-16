/* @navinprasad: redis controller */
let fetchIntents = require('./getIntents');

function getIntents()
{
  console.log('It has come to my controller :)');
  return fetchIntents();
}

module.exports = {
  getIntents: getIntents
};
