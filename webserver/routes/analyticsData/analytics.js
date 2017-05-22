const GinniAnalytics = require('../../models/ginniAnalytics');
let express = require('express');
let router = express.Router();
let log4js = require('log4js');
let logger = log4js.getLogger();



function get_user_id(req, response) {
    // Since numbers are not supported by node_acl in this case, convert
    //  them to strings, so we can use IDs nonetheless.
console.log("request in analytsics",req.user);

    return req.user._id.toString() || false;
}
// router to get count of queries asked by user
router.get('/', function(req, res) {
console.log("req in analytics",req.user);
  global.acl.isAllowed(get_user_id(req, res), '/analytics', 'get', function(err, allowed) {
      if (err) {
          console.log(err);
      } else if (allowed === false) {
          res.send({'success': 'not authenticated'});
      } else {
    console.log("printing");

  GinniAnalytics.findOne({}, function(err, data) {
    if(err) {
      logger.debug(err);
    }
    else if(data) {
        res.json({queryCount: data.queriesAsked});
      }
      else{
        res.json({queryCount: 0});
      }
  });
}//end of else
});//end of acl
});//end of route


module.exports = router;
