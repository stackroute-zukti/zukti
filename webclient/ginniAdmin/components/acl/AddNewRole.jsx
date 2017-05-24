import React from 'react';
import {
    Button,
    Segment,
    Form,
    Header,
    Modal,
    Input,
    Icon,
    Grid,
    Label,
    Table,
    Checkbox,
    Dropdown
} from 'semantic-ui-react';

import Saveaclroutes from './saveaclroutes.jsx';
import RoutesDropDown from './routesdropdown.jsx';
var temp = [];
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
var RoutesSelected = [];
var Resource = [],
    RemoveResource = []; //to get the deleted resources;
var rolesForHeader = "",
    SelectedUser = "",
    PreviousEmail = "",
    EmailAuthType = "",
    facebookEmail = 0,
    googleEmail = 0,
    localEmail = 0;
export default class AddNewRole extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            AddrolemodalSwitch: false,
            EditResourcemodalSwitch: false,
            ChangeRolemodalSwitch: false,
            AssignNewRole: false,
            email: [],
            email_new: [],
            counter: "0",
            PrevResourceSelected: [],
            routes: [
                {
                    "key": 'savebroadcastmessage',
                    "value": "/savebroadcastmessage",
                    "text": "savebroadcastmessage  (to save broadcast message to )"
                }, {
                    "key": 'getbroadcastmessage',
                    "value": "/getbroadcastmessage",
                    "text": "getbroadcastmessage (to view broadcasted msg)"
                }, {
                    "key": 'analytics',
                    "value": "/analytics",
                    "text": "analytics (to analyse details of the user)"
                }, {
                    "key": 'getadmin',
                    "value": "/getadmin",
                    "text": "getadmin (to view admin profile)"
                },
                {
                    "key": 'intent',
                    "value": "/intent",
                    "text": "intent (to analyse details of the user)"
                },
                {
                    "key": 'concept',
                    "value": "/concept",
                    "text": "concept (to analyse details of the user)"
                },
                {
                    "key": 'question',
                    "value": "/question",
                    "text": "question (to analyse details of the user)"
                },
                {
                    "key": 'retriveChat',
                    "value": "/retriveChat",
                    "text": "retriveChat (to analyse details of the user)"
                },
                {
                    "key": 'qa',
                    "value": "/qa",
                    "text": "qa (to analyse details of the user)"
                },
                {
                    "key": 'question',
                    "value": "/question",
                    "text": "question (to analyse details of the user)"
                },
                {
                    "key": 'getknowledge',
                    "value": "/getknowledge",
                    "text": "getknowledge (to analyse details of the user)"
                },
                {
                    "key": 'retriveChat',
                    "value": "/retriveChat",
                    "text": "retriveChat (to analyse details of the user)"
                },
                {
                    "key": 'bookmarks',
                    "value": "/bookmarks",
                    "text": "bookmarks (to analyse details of the user)"
                },
                {
                    "key": 'assessment',
                    "value": "/assessment",
                    "text": "assessment (to analyse details of the user)"
                },
                {
                    "key": 'dashboard',
                    "value": "/dashboard",
                    "text": "dashboard (to analyse details of the user)"
                },
                {
                    "key": 'book',
                    "value": "/book",
                    "text": "book (to analyse details of the user)"
                },
                {
                    "key": 'user',
                    "value": "/user",
                    "text": "user (to analyse details of the user)"
                },
                {
                    "key": 'recommendations',
                    "value": "/recommendations",
                    "text": "recommendations (to analyse details of the user)"
                },
                {
                    "key": 'assesment',
                    "value": "/assesment",
                    "text": "assesment (to analyse details of the user)"
                },
                {
                    "key": 'aclroutes',
                    "value": "/aclroutes",
                    "text": "aclroutes (to analyse details of the user)"
                },
                {
                    "key": 'graphie',
                    "value": "/graphie",
                    "text": "graphie (to analyse details of the user)"
                },
                {
                    "key": 'code',
                    "value": "/code",
                    "text": "code (to analyse details of the user)"
                },
                {
                    "key": 'baseIntents',
                    "value": "/baseIntents",
                    "text": "baseIntents (to analyse details of the user)"
                },
                {
                    "key": 'getSameAsIntents',
                    "value": "/getSameAsIntents",
                    "text": "getSameAsIntents (to analyse details of the user)"
                },
                {
                    "key": 'addNewSameAsIntent',
                    "value": "/addNewSameAsIntent",
                    "text": "addNewSameAsIntent (to analyse details of the user)"
                },

                {
                    "key": 'createIntent',
                    "value": "/createIntent",
                    "text": "createIntent (to analyse details of the user)"
                },
                {
                    "key": 'createConcept',
                    "value": "/createConcept",
                    "text": "createConcept (to analyse details of the user)"
                },
                {
                    "key": 'rc',
                    "value": "/rc",
                    "text": "rc (to analyse details of the user)"
                },
                {
                    "key": 'renameConcept',
                    "value": "/renameConcept",
                    "text": "renameConcept (to analyse details of the user)"
                },
                {
                    "key": 'likeOrDislike',
                    "value": "/likeOrDislike",
                    "text": "likeOrDislike (to analyse details of the user)"
                },

                {
                    "key": 'askQuestion',
                    "value": "/askQuestion",
                    "text": "askQuestion (to analyse details of the user)"
                },
                {
                    "key": 'getknowledge',
                    "value": "/getknowledge",
                    "text": "getknowledge (to analyse details of the user)"
                },
                {
                    "key": 'intents',
                    "value": "/intents",
                    "text": "intents (to analyse details of the user)"
                },
                {
                    "key": 'keywords',
                    "value": "/keywords",
                    "text": "keywords (to analyse details of the user)"
                },
                {
                    "key": 'keywordsandintents',
                    "value": "/keywordsandintents",
                    "text": "keywordsandintents (to analyse details of the user)"
                },

                {
                    "key": 'retriveChat',
                    "value": "/retriveChat",
                    "text": "retriveChat (to analyse details of the user)"
                },
                {
                    "key": 'bookmarks',
                    "value": "/bookmarks",
                    "text": "bookmarks (to analyse details of the user)"
                },
                {
                    "key": 'add',
                    "value": "/add",
                    "text": "add (to analyse details of the user)"
                },
                {
                    "key": 'fetch',
                    "value": "/fetch",
                    "text": "fetch (to analyse details of the user)"
                },
                {
                    "key": 'book',
                    "value": "/book",
                    "text": "book (to analyse details of the user)"
                }

            ],
            roleChangedFlag: false,
            roles: [],
            rolesData: [],
            rolesUpdate: [],
            rolesForDropDown: [],
            flagDropDown: false,
            emailForDropDown: [],
            newEmailForDropDown: [],
            PrevResource: [],
            flag: false
        }
        this.addNewRole = this.addNewRole.bind(this);
        this.modalOff = this.modalOff.bind(this);
        this.ChangeRole = this.ChangeRole.bind(this);
        this.EditResource = this.EditResource.bind(this);
        this.addRole = this.addRole.bind(this); //for adding new roles
        this.saveuserroles = this.saveuserroles.bind(this); //for updating roles
        this.AssignNewRole = this.AssignNewRole.bind(this);
        this.getEmail = this.getEmail.bind(this);
        this.dropdownSelectRoles = this.dropdownSelectRoles.bind(this);
        this.dropdownSelectUser = this.dropdownSelectUser.bind(this);
        this.dropdownSelectRoutes = this.dropdownSelectRoutes.bind(this);
        this.getResourceRoles = this.getResourceRoles.bind(this); //to get allocated resource for a role
        this.removeRoute = this.removeRoute.bind(this); //to remove the resource
        this.saveAlert=this.saveAlert.bind(this);
    };
    componentWillMount() {
        this.getEmail(); //called in componenwillmount also to show the counter values and inside some functions to get the updated values

    }
    saveAlert()
    {
      this.refs.container.success('saved', '',
      {

        timeOut: 3000,

        extendedTimeOut: 100

      });
    }

    //for assigning role to new user
    AssignNewRole() {
      this.getEmail(); //for getting new email entries
      this.getroles(); //for getting list roles from db
      this.setState({EditResourcemodalSwitch: false});
      this.setState({AddrolemodalSwitch: false});
      this.setState({ChangeRolemodalSwitch: false});
      this.setState({AssignNewRole: true});
    }
    //for adding new role
    addNewRole() {
      this.setState({EditResourcemodalSwitch: false});
      this.setState({AddrolemodalSwitch: true});
      this.setState({ChangeRolemodalSwitch: false});
      this.setState({AssignNewRole: false});
    }
    //for edit resource functionality
    EditResource() {
      this.getroles(); //for getting roles
      this.setState({EditResourcemodalSwitch: true});
      this.setState({AddrolemodalSwitch: false});
      this.setState({ChangeRolemodalSwitch: false});
      this.setState({AssignNewRole: false});
    }

    //for changing existing role
    ChangeRole() {

        this.getroles(); //for getting all the roles
        this.getEmail();
        this.setState({EditResourcemodalSwitch: false});
        this.setState({AddrolemodalSwitch: false});
        this.setState({ChangeRolemodalSwitch: true});
        this.setState({AssignNewRole: false});
    }

    //for turning the modalwindow  off
    modalOff() {
        this.setState({flagDropDown: false});
        this.setState({EditResourcemodalSwitch: false});
        this.setState({AddrolemodalSwitch: false});
        this.setState({ChangeRolemodalSwitch: false});
        this.setState({AssignNewRole: false});
    }
    //for getting the selected user-used in assign new role and change role
    dropdownSelectUser(e, data) {

        for (var i = 0; i < this.state.emailForDropDown.length; i++) {
            if (this.state.emailForDropDown[i]["value"] == data.value) {
                PreviousEmail = this.state.emailForDropDown[i]["role"];
                EmailAuthType = this.state.emailForDropDown[i]["authType"];
            }
        }

        if (PreviousEmail == "") {
            for (var i = 0; i < this.state.newEmailForDropDown.length; i++) {
                if (this.state.newEmailForDropDown[i]["value"] == data.value) {

                    EmailAuthType = this.state.newEmailForDropDown[i]["authType"];
                }
            }
        }

        SelectedUser = data.value;

        this.setState({flagDropDown: true});
    }
    //for getting the selected roles-used in assign new role and change role
    dropdownSelectRoles(e, data) {
        console.log("role selected", data);
        console.log("authtype", EmailAuthType);
        var arr = [];
        rolesForHeader = data.value;
        Resource = [];
        RoutesSelected = [];
        this.getResourceRoles();
        var obj = {
            email: SelectedUser,
            role: data.value,
            authType: EmailAuthType
        };

        arr.push(obj);

        this.setState({
            flag: true,
            rolesUpdate: arr,
            flagDropDown: false,
            flagDropDown: true,
            roleChangedFlag: false,
            roleChangedFlag: true
        });

    }
    //function for getting selected routes
    dropdownSelectRoutes(e, data) {
        for (let i = 0; i < data.value.length; i++) {
            RoutesSelected.push(data.value[i]);
        }

    }
    //function to remove the resource
    removeRoute(data) {

        RoutesSelected.splice(RoutesSelected.indexOf("/stream/" + data), 1);
        RemoveResource.push("/stream/" + data);

    }
    //function for getting the assigned resoureces
    getResourceRoles()
    {
        $.ajax({
            url: '/aclroutes/getResources',
            type: 'POST',
            data: {
                role: rolesForHeader
            },
            success: function(data) {
                console.log("getResourceRoles", data);
                for (let i = 0; i < data.length; i++) {
                    var res = data[i].resources;

                    RoutesSelected.push(res); //to store the previous resources into the array in which new routes will add

                    Resource.push(res.slice(8));
                }

                this.setState({PrevResourceSelected: Resource});
            }.bind(this),
            error: function(error) {}.bind(this)
        });

    }

    //for updating user roles in db
    saveuserroles() {
        console.log("rolesUpdatae got", this.state.rolesUpdate);
        for (var i = 0; i < this.state.rolesUpdate.length; i++) {
            $.ajax({
                url: '/aclroutes/updateUserRole',
                type: 'POST',
                data: {
                    'email': this.state.rolesUpdate[i].email,
                    'role': this.state.rolesUpdate[i].role,
                    'authType': this.state.rolesUpdate[i].authType
                },
                success: function(data) {
                  this.saveAlert();

                    this.setState({counter: "0"});



                    console.log("success");
                }.bind(this),
                error: function(error) {
                    console.log("error", error);
                }.bind(this)
            })

        } //end of for
    } //end of saveuserroles

    getroles() {
        $.ajax({
            url: '/aclroutes/getroles',
            type: 'GET',
            success: function(data) {
                console.log("data roles", data);
                var rolesfordropdown = [];
                var rolesnew = [];
                var count = 0;
                for (var i = 0; i < data.length; i++) {
                    if (data[i] != "") {
                        var samp = {
                            "key": data[i]["role"],
                            "value": data[i]["role"],
                            "text": data[i]["role"]
                        };
                        rolesfordropdown.push(samp);

                    } else {
                        count++;
                        rolesnew.push(data[i]["email"]);
                    }
                }
                this.setState({rolesForDropDown: rolesfordropdown}); //for displaying roles in dropdown

            }.bind(this),
            error: function(error) {}.bind(this)
        });
    }
    //function for getting new entries from db - Rajapavithra
    getEmail() {

        localEmail = 0;
        googleEmail = 0;
        facebookEmail = 0;
        $.ajax({
            url: '/aclroutes/getnewemail',
            type: 'GET',
            success: function(data) {
                //var rolesnew = [];
                console.log("data got in getnewemailroute", data);
                var count = 0;
                var emailForDropDown = [];
                var arr = [];
                for (var i = 0; i < data.length; i++) {
                    if ((data[i]["facebook"] != undefined) && (data[i]["facebook"]["role"] == " ") && (data[i]["facebook"]["email"] != undefined)) {
                        count++;
                        var samp = {
                            "key": data[i]["facebook"]["email"],
                            "value": data[i]["facebook"]["email"],
                            "text": data[i]["facebook"]["email"],
                            "authType": "facebook"
                        };
                        arr.push(samp); //to get user having roles- used in change role functinality

                    }
                    if ((data[i]["facebook"] != undefined) && (data[i]["facebook"]["role"] != " ") && (data[i]["facebook"]["email"] != undefined)) {
                        var samp = {
                            "key": data[i]["facebook"]["email"],
                            "value": data[i]["facebook"]["email"],
                            "text": data[i]["facebook"]["email"],
                            "role": data[i]["facebook"]["role"],
                            "authType": "facebook"
                        };
                        console.log("data pushed", samp);
                        emailForDropDown.push(samp);

                    }
                    if ((data[i]["local"] != undefined) && (data[i]["local"]["role"] == " ") && (data[i]["local"]["email"] != undefined)) {
                        count++;
                        var samp = {
                            "key": data[i]["local"]["email"],
                            "value": data[i]["local"]["email"],
                            "text": data[i]["local"]["email"],
                            "authType": "local"
                        };
                        arr.push(samp); //to get user having roles- used in change role functinality
                    }
                    if ((data[i]["local"] != undefined) && (data[i]["local"]["role"] != " ") && (data[i]["local"]["email"] != undefined)) {
                        var samp = {
                            "key": data[i]["local"]["email"],
                            "value": data[i]["local"]["email"],
                            "text": data[i]["local"]["email"],
                            "role": data[i]["local"]["role"],
                            "authType": "local"
                        };
                        console.log("data pushed", samp);
                        emailForDropDown.push(samp);

                    }
                    if ((data[i]["google"] != undefined) && (data[i]["google"]["role"] == " ") && (data[i]["google"]["email"] != undefined)) {
                        count++;
                        var samp = {
                            "key": data[i]["google"]["email"],
                            "value": data[i]["google"]["email"],
                            "text": data[i]["google"]["email"],
                            "authType": "google"
                        };
                        arr.push(samp); //to get user having roles- used in change role functinality
                    }
                    if ((data[i]["google"] != undefined) && (data[i]["google"]["role"] != " ") && (data[i]["google"]["email"] != undefined)) {
                        var samp = {
                            "key": data[i]["google"]["email"],
                            "value": data[i]["google"]["email"],
                            "text": data[i]["google"]["email"],
                            "role": data[i]["google"]["role"],
                            "authType": "google"
                        };
                        console.log("data pushed", samp);
                        emailForDropDown.push(samp);

                    }
                } //end of for
                console.log("emailForDropDown", this.state.emailForDropDown);
                this.setState({emailForDropDown: emailForDropDown}); //for displaying user email having role in dropdown
                this.setState({newEmailForDropDown: arr}); //for displaying new entry email in dropdown
                this.setState({counter: count}); //for showing number of new entries

            }.bind(this),
            error: function(error) {}.bind(this)
        });
    }
    //function for adding new role to db

    addRole() {

        $.ajax({
            url: '/aclroutes/addrolestodb',
            type: 'POST',
            data: {
                role: this.roleInput.value
            },
            success: function(data) {

               this.saveAlert();

                this.roleInput.value = ''
            }.bind(this),
            error: function(error) {}.bind(this)
        })

    }
    render() {

        return (
            <Grid id="Grid">
                <Grid.Row columns={4}>
                    <Grid.Column>
                      <Label floating color='red'>
                          {this.state.counter}</Label>
                         <Modal open={this.state.AddrolemodalSwitch} trigger={< Button secondary onClick = {
                            this.addNewRole
                        } > Add New Role < /Button>}>
                            <Header icon='lock' content='Create New Role'/>
                            <Modal.Content>
                            <div>

                   <ToastContainer ref='container' toastMessageFactory=            {ToastMessageFactory} className='toast-top-center'/>

               </div>
                                <Segment inverted>
                                    <Form id='New Role'>
                                        <input placeholder='add role' width='100%' ref={(input1) => {
                                            this.roleInput = input1;
                                        }}/>
                                        <br></br>
                                    </Form>
                                    <br/>

                                    <Button color='green' onClick={this.addRole} style={{
                                        marginLeft: '550px'
                                    }}>
                                        <Icon name='add user'/>
                                        Add Role
                                    </Button>

                                    <Button color='red' onClick={this.modalOff}>
                                        <Icon name='close'/>
                                        Close
                                    </Button>

                                </Segment>
                            </Modal.Content>
                        </Modal>

                    </Grid.Column>
                                <Grid.Column>
                                <Modal open={this.state.AssignNewRole} trigger={< Button secondary onClick = {
                            this.AssignNewRole
                        } > Add roles to new User</Button>}>
                            <Header icon='lock' content='Assign Role to New User'/>
                            <Modal.Content>
                            <div>

                   <ToastContainer ref='container' toastMessageFactory=            {ToastMessageFactory} className='toast-top-center'/>

               </div>
                                <Segment inverted>
                                    <Dropdown placeholder='Select User' onChange={this.dropdownSelectUser} fluid search selection options={this.state.newEmailForDropDown}/>{this.state.flagDropDown
                                        ? <Dropdown placeholder='Select role' onChange={this.dropdownSelectRoles} fluid search selection options={this.state.rolesForDropDown}/>
                                        : ''}
                                    <Button disabled={!this.state.flagDropDown} color='green' onClick={this.saveuserroles}>
                                        Save
                                    </Button>
                                    <Button color='red' onClick={this.modalOff}>
                                        <Icon name='close'/>
                                        Close
                                    </Button>
                                </Segment>
                            </Modal.Content>
                        </Modal>

                    </Grid.Column>
                    <Grid.Column>
                        <Modal open={this.state.EditResourcemodalSwitch} trigger={< Button secondary onClick = {
                            this.EditResource
                        } > Edit Resource < /Button>}>
                            <Header icon='lock' content='Edit Resource'/>
                            <Modal.Content>
                            <div>

                   <ToastContainer ref='container' toastMessageFactory=            {ToastMessageFactory} className='toast-top-center'/>

               </div>
                                <Segment inverted>
                                    <Dropdown placeholder='Select role' onChange={this.dropdownSelectRoles} fluid search selection options={this.state.rolesForDropDown}/> {this.state.flagDropDown && this.state.roleChangedFlag
                                        ? <RoutesDropDown toDelete={this.removeRoute} ResourceSelected={Resource} routes={this.state.routes} selectedRoutes={this.dropdownSelectRoutes}/>
                                        : ' '}
                                    <Saveaclroutes toremove={RemoveResource} routes_Selected={RoutesSelected} role={rolesForHeader} disabled={!this.state.flagDropDown}/>
                                    <Button color='red' onClick={this.modalOff}>
                                        <Icon name='close'/>
                                        Close
                                    </Button>

                                </Segment>
                            </Modal.Content>
                        </Modal>

                    </Grid.Column>
                    <Grid.Column>
                        <Modal open={this.state.ChangeRolemodalSwitch} trigger={< Button secondary onClick = {
                            this.ChangeRole
                        } > Change Role < /Button>}>
                            <Header icon='lock' content='Change Role'/>
                            <Modal.Content>
                            <div>

                   <ToastContainer ref='container' toastMessageFactory=            {ToastMessageFactory} className='toast-top-center'/>

               </div>
                                <Segment inverted>
                                    <Dropdown placeholder='Select User' onChange={this.dropdownSelectUser} fluid search selection options={this.state.emailForDropDown}/>{this.state.flagDropDown
                                        ? <Dropdown placeholder='Select role' defaultValue={PreviousEmail} onChange={this.dropdownSelectRoles} fluid search selection options={this.state.rolesForDropDown}/>
                                        : ''}
                                    <Button color='green' disabled={!this.state.flagDropDown} onClick={this.saveuserroles}>
                                        Save
                                    </Button>
                                    <Button color='red' onClick={this.modalOff}>
                                        <Icon name='close'/>
                                        Close
                                    </Button>

                                </Segment>
                            </Modal.Content>
                        </Modal>

                    </Grid.Column>
                </Grid.Row>

            </Grid>
        );
    }
}
