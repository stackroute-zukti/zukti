/* @ramvignesh: route to update user model */
let express = require('express');
let router = express.Router();
let setLoginDomain = require('./functions/setLoginDomain');

/* @ramvignesh: router to update user's current domain */
router.put('/setlogindomain', function(req, res) {
  console.log('inside setLoginDomain router');
    let email = req.body.email;
    let domain = req.body.domain;
    setLoginDomain(email, domain);
    res.send('done');
});

module.exports = router;
