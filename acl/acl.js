global.node_acl = require('acl');
var acl,
    db;
var express = require('express');
var app = express();
var acl1 = require('./acldb');

module.exports = {
    aclpart: function(callback) {
        acl1.connectToServer(function(err) {
            if (err) {
                console.log('Reporting error from Appjs');
            } else {
                db = acl1.getDb();
                acl = new global.node_acl(new global.node_acl.mongodbBackend(db, ''));
                set_roles();

            }
            return callback(err);
        })

    },
    getAcl: function() {
        return acl;
    }
};
function set_roles() {
  console.log("inside acl");
  acl.allow(require('../Testaclroles.json'));

    // Inherit roles
    //  Every user is allowed to do what guests do
    //  Every admin is allowed to do what users do

  var Roles_add=require('../Id_Roles.json');
var role;
 for(var k in Roles_add){

   if ((Roles_add[k]["facebook"] != undefined) && (Roles_add[k]["facebook"]["role"] != " ")&&(Roles_add[k]["facebook"]["email"] != undefined)) {

       role=Roles_add[k]["facebook"]["role"];

   }
   else if ((Roles_add[k]["local"] != undefined) && (Roles_add[k]["local"]["role"] != " ")&&(Roles_add[k]["local"]["email"] != undefined)) {
     role=Roles_add[k]["local"]["role"];
   }

   if ((Roles_add[k]["google"] != undefined) && (Roles_add[k]["google"]["role"] != " ")&&(Roles_add[k]["google"]["email"] != undefined)) {
       role=Roles_add[k]["google"]["role"];

   }

 console.log("values in acl id roles",Roles_add[k]._id+"role got"+role);

  acl.addUserRoles(Roles_add[k]._id,role);
//acl.addUserRoles("591d8dae335d2c43b99e951c","zukti");
  }

  acl.addRoleParents('zukti', 'admin');
acl.addRoleParents('Zynla', 'admin');
acl.addRoleParents('admin', 'superadmin');
    // acl.addUserRoles(id_cus,role);
    // acl.addUserRoles(id_Ad, role_ad);

} //end of roles
