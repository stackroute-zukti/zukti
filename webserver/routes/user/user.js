/* @ramvignesh: route to update user model */
let express = require('express');
let router = express.Router();
let User = require('../../models/user');
let setLoginDomain = require('./functions/setLoginDomain');
let domainSet = [];
/* @ramvignesh: router to update user's current domain */
/* @deepika: router to track user's domain */
router.put('/setlogindomain', function(req, res) {
  console.log('inside setLoginDomain router');
    let email = req.body.email;
    let domain = req.body.domain;
    User.findOne({
      $or: [{ 'local.email': email }, { 'google.email': email }, { 'facebook.email': email }]
    }, function(error, userdetails) {
      if(error) {
        console.log(error);
      }
      else {
      userdetails.local.domain.push(domain);
      domainSet = userdetails.local.domain;}
});
    domainSet = domainSet.filter(function(item, index, inputArray) {
           return inputArray.indexOf(item) === index;
    });
    console.log('domainset in routes' + domainSet);
    setLoginDomain(email, domain, domainSet);
    res.send('done');
});

module.exports = router;
