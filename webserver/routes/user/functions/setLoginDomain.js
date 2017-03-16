/* @ramvignesh: updating the user's current domain in mongo */
/* @deepika: updating the user's tracked domain in mongo */
let User = require('./../../../models/user');
let setLoginDomain = function(email, domain, domainSet) {
  console.log(email + ' inside setLogin Domain');
    User.findOneAndUpdate({
      $or: [{ 'local.email': email }, { 'google.email': email }, { 'facebook.email': email }]
  }, {
        $set: {
            'local.loggedinDomain': domain,
            'local.domain': domainSet
        }
    }, function(error) {
      console.log(error);
        if (error) {
            return 'LoggedinDomain not updated';
        }
        console.log('updated');
        return 'LoggedinDomain updated successfully';
    });
};

module.exports = setLoginDomain;
