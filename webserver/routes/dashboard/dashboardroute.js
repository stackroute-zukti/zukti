let express = require('express');
let router = express.Router();
const RegisteredUser = require('../../models/user');
router.post('/fetch', function(req, res) {
    var id = req.body.id;
    var authType = req.body.authType;
    var query={};
    var str = authType+'.email';
    query[str]=id;
    RegisteredUser.find(query,function(err,user){
      console.log(user);
      res.send(user);
    })
   });
module.exports = router;
