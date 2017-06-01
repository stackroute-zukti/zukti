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
import DatePicker from 'react-datepicker';
import moment from 'moment';
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
            startDate: moment(),
            date: '',
            email_new: [],
            counter: "0",
            PrevResourceSelected: [],
            routes: [
               {
                   "key": 'savebroadcastmessage',
                   "value": "/savebroadcastmessage",
                   "text": "to save broadcast message"
               }, {
                   "key": 'getbroadcastmessage',
                   "value": "/getbroadcastmessage",
                   "text": "to view sent broadcasted msg"
               }, {
                   "key": 'analytics',
                   "value": "/analytics",
                   "text": "to analyse details of the user"
               }, {
                   "key": 'getadmin',
                   "value": "/getadmin",
                   "text": "to view admin profile"
               }, {
                   "key": 'intent',
                   "value": "/intent",
                   "text":"to analyse details of the user"
               }, {
                   "key": 'concept',
                   "value": "/concept",
                   "text": "to get into concept"
               }, {
                   "key": 'question',
                   "value": "/question",
                   "text": "to get into question options"
               }, {
                   "key": 'retriveChat',
                   "value": "/retriveChat",
                   "text": "to retrieve previous chat"
               }, {
                   "key": 'qa',
                   "value": "/qa",
                   "text": "to question answer set"
               },  {
                   "key": 'getknowledge',
                   "value": "/getknowledge",
                   "text": "to getknowledge"
               },  {
                   "key": 'bookmarks',
                   "value": "/bookmarks",
                   "text": "to save bookmarks"
               }, {
                   "key": 'assessment',
                   "value": "/assessment",
                   "text": "to access assessment functionality"
               }, {
                   "key": 'dashboard',
                   "value": "/dashboard",
                   "text": "to access dashboard"
               }, {
                   "key": 'book',
                   "value": "/book",
                   "text": "to access book"
               }, {
                   "key": 'user',
                   "value": "/user",
                   "text": "to access user details"
               }, {
                   "key": 'recommendations',
                   "value": "/recommendations",
                   "text": "to access recommendations"
               },  {
                   "key": 'aclroutes',
                   "value": "/aclroutes",
                   "text": "to access acl routes(admin only)"
               }, {
                   "key": 'graphie',
                   "value": "/graphie",
                   "text": "to get graph"
               }, {
                   "key": 'code',
                   "value": "/code",
                   "text": "to get code answer"
               }, {
                   "key": 'baseIntents',
                   "value": "/baseIntents",
                   "text": "to access baseIntents"
               }, {
                   "key": 'getSameAsIntents',
                   "value": "/getSameAsIntents",
                   "text": "to access getsameAsIntents"
               }, {
                   "key": 'addNewSameAsIntent',
                   "value": "/addNewSameAsIntent",
                   "text": "to  access addNewSameAsIntent "
               }, {
                   "key": 'createIntent',
                   "value": "/createIntent",
                   "text": "to create a new Intent"
               }, {
                   "key": 'createConcept',
                   "value": "/createConcept",
                   "text": "adds a new concept"
               }, {
                   "key": 'rc',
                   "value": "/rc",
                   "text": "to read an already existing concept"
               }, {
                   "key": 'renameConcept',
                   "value": "/renameConcept",
                   "text": "to rename an already existing concept"
               }, {
                   "key": 'likeOrDislike',
                   "value": "/likeOrDislike",
                   "text": "to like or dislike a concept"
               }, {
                   "key": 'askQuestion',
                   "value": "/askQuestion",
                   "text": "ask a new question"
               }, {
                   "key": 'getknowledge',
                   "value": "/getknowledge",
                   "text": "provides the question answer set"
               }, {
                   "key": 'intents',
                   "value": "/intents",
                   "text": "gets all the applicable intents"
               }, {
                   "key": 'keywords',
                   "value": "/keywords",
                   "text": "gets the question containing specific keyword"
               }, {
                   "key": 'keywordsandintents',
                   "value": "/keywordsandintents",
                   "text": "gets the question containing specific keyword and intent"
               }, {
                   "key": 'retriveChat',
                   "value": "/retriveChat",
                   "text": "to retrieve chat with domain"
               }, {
                   "key": 'bookmarks',
                   "value": "/bookmarks",
                   "text": "get user bookmarked answers "
               }, {
                   "key": 'add',
                   "value": "/add",
                   "text": "add a new bookmark"
               }, {
                   "key": 'fetch',
                   "value": "/fetch",
                   "text": "fetch the required details"
               }, {
                   "key": 'book',
                   "value": "/book",
                   "text": "to create and display the book relevant to particular concept"
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
            flag: false,
            flagDate: "0"
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
        this.saveAlert = this.saveAlert.bind(this);
        this.dateAlert = this.dateAlert.bind(this);
        this.dataAlert = this.dataAlert.bind(this);
        this.roleAlert=this.roleAlert.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };
    componentWillMount() {
        this.getEmail(); //called in componenwillmount also to show the counter values and inside some functions to get the updated values

    }

    handleChange(date) {
        this.setState({flagDate: "0"});
        var d = moment(date);
        var time = d.format('MM/DD/YYYY');
        console.log("formated date", time);
        this.state.date = time;
        this.setState({date: this.state.date});
        this.setState({startDate: date});
        // console.log(this.state.);
        console.log("start date", this.state.startDate);

        console.log("email list got", this.state.newEmailForDropDown);
        if (this.state.newEmailForDropDown.length > 0) {
            var newArr = [];
            for (let i = 0; i < this.state.newEmailForDropDown.length; i++) {

                var dbGot = this.state.newEmailForDropDown[i].date;

                var datebfrComp = dbGot.split("/");
                console.log("splitted useing /", datebfrComp[0]);
                if (datebfrComp[0].length < 2) {
                    console.log(";below 2", datebfrComp[0]);
                    dbGot = "0" + dbGot;
                }

                var dbDate = dbGot.split(",");
                console.log("date after splitting", dbDate[0]);

                if (dbDate[0] == time) {
                    console.log("same date");
                    this.setState({flagDate: "1"});
                    newArr.push(this.state.newEmailForDropDown[i]);
                } else {
                    console.log("no same date");
                }
            } //end of for
            if (newArr.length > 0) {
                this.setState({newEmailForDropDown: newArr});
                console.log("final newEmailForDropDown", this.state.newEmailForDropDown);

            } else {
                this.dateAlert();

            }
        } else {
            this.dataAlert();
            console.log("no data");


        }
    }

    saveAlert()
    {
        this.refs.container.success('saved', '', {

            timeOut: 3000,

            extendedTimeOut: 100

        });
    }
    dataAlert()
    {
        this.refs.container.warning('No New User', '', {

            timeOut: 3000,

            extendedTimeOut: 100

        });
    }
    roleAlert()
    {
        this.refs.container.warning('Role already exists', '', {

            timeOut: 3000,

            extendedTimeOut: 100

        });
    }
    dateAlert()
    {
        this.refs.container.warning('no user found', '', {

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
                for (let i = 0; i < data.length; i++) {
                    var res = data[i].resources;

                    RoutesSelected.push(res); //to store the previous resources into the array in which new routes will add

                    Resource.push(res.slice(1));
                }

                this.setState({PrevResourceSelected: Resource});
            }.bind(this),
            error: function(error) {}.bind(this)
        });

    }

    //for updating user roles in db
    saveuserroles() {
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

                }.bind(this),
                error: function(error) {}.bind(this)
            })

        } //end of for
    } //end of saveuserroles

    getroles() {
        $.ajax({
            url: '/aclroutes/getroles',
            type: 'GET',
            success: function(data) {
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
                            "authType": "facebook",
                            "date": data[i]["date"]
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
                        emailForDropDown.push(samp);

                    }
                    if ((data[i]["local"] != undefined) && (data[i]["local"]["role"] == " ") && (data[i]["local"]["email"] != undefined)) {
                        count++;
                        var samp = {
                            "key": data[i]["local"]["email"],
                            "value": data[i]["local"]["email"],
                            "text": data[i]["local"]["email"],
                            "authType": "local",
                            "date": data[i]["date"]
                        };
                        arr.push(samp); //to get user having roles- used in change role functinality
                    }
                    if ((data[i]["local"] != undefined) && (data[i]["local"]["role"] != " ") && (data[i]["local"]["email"] != undefined)) {
                        var samp = {
                            "key": data[i]["local"]["email"],
                            "value": data[i]["local"]["email"],
                            "text": data[i]["local"]["email"],
                            "role": data[i]["local"]["role"],
                            "authType": "local",
                            "date": data[i]["date"]
                        };
                        emailForDropDown.push(samp);

                    }
                    if ((data[i]["google"] != undefined) && (data[i]["google"]["role"] == " ") && (data[i]["google"]["email"] != undefined)) {
                        count++;
                        var samp = {
                            "key": data[i]["google"]["email"],
                            "value": data[i]["google"]["email"],
                            "text": data[i]["google"]["email"],
                            "authType": "google",
                            "date": data[i]["date"]
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
                        emailForDropDown.push(samp);

                    }
                } //end of for
                this.setState({emailForDropDown: emailForDropDown}); //for displaying user email having role in dropdown
                this.setState({newEmailForDropDown: arr}); //for displaying new entry email in dropdown
                this.setState({counter: count}); //for showing number of new entries

            }.bind(this),
            error: function(error) {}.bind(this)
        });
    }
    //function for adding new role to db

    addRole() {
        var flag = 0;
        //call to get roles
        this.getroles();
          console.log("length is"+this.state.rolesForDropDown.length);
          console.log("roles got",this.state.rolesForDropDown);
        if (this.state.rolesForDropDown.length > 0) {
            var tocheck = this.roleInput.value.toLowerCase();
            console.log("length is"+this.state.rolesForDropDown.length);
            for (let i = 0; i < this.state.rolesForDropDown.length; i++) {
                if (this.state.rolesForDropDown[i].text == tocheck) {
                    console.log("role already exists");
                    flag = 1;
                }
            }
        }
        if (flag === 0) {
            console.log("Its a new role.it needs to be added");
            $.ajax({
                url: '/aclroutes/addrolestodb',
                type: 'POST',
                data: {
                    role: this.roleInput.value.toLowerCase()
                },
                success: function(data) {

                    this.saveAlert();

                    this.roleInput.value = ''
                }.bind(this),
                error: function(error) {}.bind(this)
            })
        } else if (flag === 1) {
          this.roleAlert();
            flag = 0;
        }
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

                                    <ToastContainer ref='container' toastMessageFactory={ToastMessageFactory} className='toast-top-center'/>
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
                        <Modal open={this.state.AssignNewRole} trigger={< Button disabled={this.state.counter==0}secondary onClick = {
                            this.AssignNewRole
                        } > Add Roles To New User < /Button>}>
                            <Header icon='lock' content='Assign Role to New User'/>
                            <Modal.Content>
                                <div>
                                    Select Date:
                                    <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>

                                    <ToastContainer ref='container' toastMessageFactory={ToastMessageFactory} className='toast-top-center'/>

                                </div>
                                <Segment inverted>
                                    {this.state.flagDate == 1
                                        ? <Dropdown placeholder='Select User' onChange={this.dropdownSelectUser} fluid search selection options={this.state.newEmailForDropDown}/>
                                        : ''}{this.state.flagDropDown
                                        ? <Dropdown placeholder='Select role' onChange={this.dropdownSelectRoles} fluid search selection options={this.state.rolesForDropDown}/>
                                        : ''}<br/>
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

                                    <ToastContainer ref='container' toastMessageFactory={ToastMessageFactory} className='toast-top-center'/>

                                </div>
                                <Segment inverted>
                                    <Dropdown placeholder='Select role' onChange={this.dropdownSelectRoles} fluid search selection options={this.state.rolesForDropDown}/> {this.state.flagDropDown && this.state.roleChangedFlag
                                        ? <RoutesDropDown toDelete={this.removeRoute} ResourceSelected={Resource} routes={this.state.routes} selectedRoutes={this.dropdownSelectRoutes}/>
                                        : ' '}<br/>
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

                                    <ToastContainer ref='container' toastMessageFactory={ToastMessageFactory} className='toast-top-center'/>

                                </div>
                                <Segment inverted>
                                    <Dropdown placeholder='Select User' onChange={this.dropdownSelectUser} fluid search selection options={this.state.emailForDropDown}/>{this.state.flagDropDown
                                        ? <Dropdown placeholder='Select role' defaultValue={PreviousEmail} onChange={this.dropdownSelectRoles} fluid search selection options={this.state.rolesForDropDown}/>
                                        : ''}<br/>
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
