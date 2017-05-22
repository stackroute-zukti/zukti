import React from 'react';
import {Button} from 'semantic-ui-react';

var temp = [];
var flagEmptyResource = 0;
var flagEmptyRemove = 0;
export default class Saveaclroutes extends React.Component {
    constructor() {
        super();
        this.state = {
            RolesArr: []
        };
        this.saveAclRoutes = this.saveAclRoutes.bind(this);
        this.createJSON = this.createJSON.bind(this);
    }
    saveAclRoutes() {
        console.log("role selected ", this.props.role);
        console.log("routes selected", this.props.routes_Selected);
        this.createJSON(this.props.routes_Selected);

        // this.arrangeRoutes(this.props.assigned_Roles);
    }
    //     }
    //
    //     arrangeRoutes(e) {
    //         temp = e;
    //         console.log("array got in save acl", temp);
    //         for (let i = 0; i < temp.length; i++) {
    //             for (let j = i; j < temp.length; j++) {
    //                 if (temp[i].role > temp[j].role) {
    //                     var t = temp[i];
    //                     temp[i] = temp[j];
    //                     temp[j] = t;
    //                 }
    //             }
    //         }
    //         console.log("sorted ", temp);
    //         this.createJSON(temp);
    //     }

    createJSON(e) {
        flagEmptyResource = 0;
        flagEmptyRemove = 0;
        console.log("got e", e);
        if (e.length == 0) {
            flagEmptyResource = 1;
        }
        var roles_arr = [];
        var allows_arr = [];
        var roles_obj = {};
        roles_obj.roles = this.props.role;
        for (let i = 0; i < e.length; i++) {
            var allows_obj = {};
            allows_obj.resources = e[i];
            allows_obj.permissions = "*";
            allows_arr.push(allows_obj);
        }
        roles_obj.allows = allows_arr;
        console.log("to remove", this.props.toremove);
        if (this.props.toremove.length == 0) {
            flagEmptyRemove = 1;
        }
        console.log("to remove length", this.props.toremove.length);
          console.log("to remove value",this.props.toremove);
        console.log("final json", roles_obj.allows);
        console.log("to write", roles_obj);
        console.log("falg emptyREsource", flagEmptyResource);
        console.log("flag emptyremove", flagEmptyRemove);
        $.ajax({
            url: '/addAclRoles',
            type: 'POST',
            dataType: 'json',
            data: {
                "data_to_store":JSON.stringify(roles_obj),
                "role": this.props.role,
                "toremove":JSON.stringify(this.props.toremove),
                "flagEmptyRemove": flagEmptyRemove,
                "flagEmptyResource": flagEmptyResource
            },
            success: function(data) {
                console.log("success");
            }.bind(this),
            error: function(data) {
                console.log("inside error")
            }.bind(this)
        });
    }
    render() {
        return (

            <Button disabled={this.props.disabled} primary onClick={this.saveAclRoutes}>Save Routes</Button>

        );
    }
} //end of class
