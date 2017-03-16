/* @ramvignesh: route to get recommendations */
let express = require('express');
let router = express.Router();

let getSiblings = require('./functions/getSiblings');
// let getChildren = require('./functions/getChildren');

router.get('/getSiblings', function(req, res) {
  let keyword = req.query.keywords;
  // console.log('getSiblings: ', keyword+".......here at rec");
  function callBack(siblings) {
    // console.log(siblings+"......at callBack");
  res.json({siblings: siblings});
  }
  let siblings = getSiblings(keyword, callBack);
  console.log(siblings);
});


module.exports = router;
