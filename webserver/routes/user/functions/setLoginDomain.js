/* @ramvignesh: updating the user's current domain in mongo */
let User = require('./../../../models/user');
let setLoginDomain = function(email, domain) {
  console.log(email + ' inside setLogin Domain');
    User.findOneAndUpdate({
      $or: [{ 'local.email': email }, { 'google.email': email }, { 'facebook.email': email }]
  }, {
        $set: {
            'local.loggedinDomain': domain
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
