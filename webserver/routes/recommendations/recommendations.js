/* @ramvignesh: route to get recommendations */
let express = require('express');
let router = express.Router();
let log4js = require('log4js');
let logger = log4js.getLogger();
let getSiblings = require('./functions/getSiblings');
// let getChildren = require('./functions/getChildren');

router.get('/getSiblings', function(req, res) {
  let keyword = [];
  if(!(req.query.keywords === undefined)) {
    keyword = req.query.keywords;
  }
  logger.debug('getSiblings: ', keyword);
  function callBack(siblings) {
    // logger.debug(siblings+"......at callBack");
  res.json({siblings: siblings});
  }
  let siblings = getSiblings(keyword, callBack);
  logger.debug('siblings received: ', siblings);
});


module.exports = router;
