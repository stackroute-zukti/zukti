import React from 'react';
import {Button} from 'semantic-ui-react';
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
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
        this.Alert = this.Alert.bind(this);
    }
    Alert()
    {
        this.refs.container.success('saved', '', {

            timeOut: 3000,

            extendedTimeOut: 100

        });
    }
    saveAclRoutes() {
        this.createJSON(this.props.routes_Selected);

    }

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

        if (this.props.toremove.length == 0) {
            flagEmptyRemove = 1;
        }

        $.ajax({
            url: '/addAclRoles',
            type: 'POST',
            dataType: 'json',
            data: {
                "data_to_store": JSON.stringify(roles_obj),
                "role": this.props.role,
                "toremove": JSON.stringify(this.props.toremove),
                "flagEmptyRemove": flagEmptyRemove,
                "flagEmptyResource": flagEmptyResource
            },
            success: function(data) {
                this.Alert();

            }.bind(this),
            error: function(data) {
                console.log("inside error")
            }.bind(this)
        });
    }
    render() {
        return (
            <div>

                <ToastContainer ref='container' toastMessageFactory={ToastMessageFactory} className='toast-top-center'/>
                <br/>
                <Button disabled={this.props.disabled} primary onClick={this.saveAclRoutes}>Save Routes</Button>
            </div>
        );
    }
} //end of class
