import React, {Component} from 'react';
import LeftMenuContent from '../leftmenuPusherContent/leftmenuContent';
import {Sidebar, Segment, Image, Icon, Menu, Popup, Label, Dropdown, Form, Button, List, Input, Grid, Header, Modal} from 'semantic-ui-react';
import Axios from 'axios';
import Cookie from 'react-cookie';
import {hashHistory} from 'react-router';
import Tour from "react-user-tour"
import './leftmenu.css';
import LeftMenuPage from '../../../Multi_Lingual/Wordings.json';
// @ChatBot :  components import starting from here
import DisplayListUs from '../discussion/DisplayListUs.jsx';
import DisplayListCh from '../discussion/displayListCh.jsx';
import '../discussion/sidebar.css';
import ReactDOM from 'react-dom';
// @ChatBot : component import ended here
export default class LeftMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeItem: 'Build',
            details: '',
            email: '',
            firstname: '',
            lastname: '',
            usertype: false,
            name: '',
            photo: '',
            counter: 0,
            isTourActive: false,
            tourStep: 1,
            leftMenuVisible: true,
            sideMenuVisible: false,
            activeUser:'',
            activeMail:'',
            chatType:'',
            channelArray:[],
            userNames:[],
            communication:{},
            socketUser:'',
            socketMail:'',
            senderMessage:{},
            chatDetails:[],
            channelMsg: {},
            notification: {},
            modalSwitch:false,
            setChannel:false,
            setUser:false
        };
        this.onUserStats = this.onUserStats.bind(this);
        this.onSubmitEmail = this.onSubmitEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.getNotificationCount = this.getNotificationCount.bind(this);
        this.getUserInformation = this.getUserInformation.bind(this);
        this.retriveChat = this.retriveChat.bind(this);
        this.setTourState = this.setTourState.bind(this);

        // @ChatBot:  methods
        this.handle=this.handle.bind(this);
        this.getSenderMessage=this.getSenderMessage.bind(this);
        this.getChatHistory = this.getChatHistory.bind(this);
        this.getAllChannels = this.getAllChannels.bind(this);
        this.modalOn = this.modalOn.bind(this);
        this.modalOff = this.modalOff.bind(this);
        this.onSubmitChannelName = this.onSubmitChannelName.bind(this);
        this.handleChannel = this.handleChannel.bind(this);
        this.createGeneral = this.createGeneral.bind(this);
        // @ChatBot:  ended chat methods
    }
    //  @Mayanka: call retriveChat to check history
    componentWillMount(){
      this.retriveChat();

    }
    //  @Mayanka: if chat history is empty start the user-tour
  setTourState() {
      if(this.state.tourFlag == 1)
      {
        this.setState({
          isTourActive: true,
          tourStep: 1
        });
      }
    }
    restart()
    {
      this.setState({activeItem: Assessment, counter: this.state.counter});
    }
    handleItemClick = ((e, {name}) => {

        if (this.state.activeItem === 'notifications') {
            let url = '/getbroadcastmessage/updateCount';
            this.state.counter = 0;
            Axios.post(url).then((response) => {}).catch((error) => {
                console.log(error);
            });
        }
        this.setState({activeItem: name, counter: this.state.counter});
        if (name === 'discussion' || name === 'Back') {
          this.setState({leftMenuVisible:!this.state.leftMenuVisible,
            sideMenuVisible:!this.state.sideMenuVisible});
        }
    });

    // @ChatBot : functionality started from here

    // @ChatBot : model window open and close
    modalOn()
    {
      this.setState({modalSwitch:true})
    }

    modalOff()
    {
      this.setState({modalSwitch:false})
    }
    // @ChatBot : getting topic name
    onSubmitChannelName(e)
    {
      e.preventDefault();
      let message = ReactDOM.findDOMNode(this.refs.channelName).value;
      if(message.trim() === '')
      {
        return;
      }
      ReactDOM.findDOMNode(this.refs.channelName).value = '';
      Axios({
        url: '/channel/addNewChannel',
        method: 'post',
        data: {channelName:message}})
      .then(function(response)
      {
        this.getAllChannels();
      }.bind(this))
      .catch(function(error)
      {
        console.log(error);
      }.bind(this));
      this.setState({modalSwitch:false});
    }
    // @ChatBot : getting topic chat history
    handleChannel(data)
    {
      socket.emit('change_channel',{prevChannel:this.state.activeUser,currentChannel:data.value});
      this.setState({activeUser:data.value,chatType:data.type,setUser:false,setChannel:true});
      Axios({
        url: '/channel/getAllMessagesChannel',
        method: 'post',
        data: {channelName:data.value}})
      .then(function(response)
      {
        this.setState({chatDetails:response.data.allmsgs});
      }.bind(this))
      .catch(function(error)
      {
      }.bind(this));
    }

    // @ChatBot : getting user chat history
    handle(data)
    {
      this.setState({activeMail:data.email, activeUser:data.name, chatType:data.type,setChannel:false, setUser:true});
      this.getChatHistory(data.email);
    }

    // @ChatBot : save message to mongoDB and emit message to particular user
    getSenderMessage(senderMsg)
    {
      if(this.state.chatType == 'channel')
      {
        let msgArray=this.state.chatDetails;
        let date=new Date();
        socket.emit('send_to_channel',{channelName:this.state.activeUser,
          newMsg:{date:date,message:senderMsg.message,
          senderName:this.state.socketUser}});
        //msgArray.push({date:data.date,message:data.message,senderName:data.senderName});
        this.setState({chatDetails:msgArray});
      }
      else
      {
        var tempArr = this.state.chatDetails
        tempArr = tempArr.concat(senderMsg);
        this.setState({chatDetails: tempArr});
      }

    }

    // @ChatBot : getting All Topics name
    getAllChannels()
    {
      Axios({
        url: '/channel/getAllChannels',
        method: 'post'})
      .then(function(response)
      {
        socket.emit('display_channels',response.data.allChannels);
      }.bind(this))
      .catch(function(error)
      {
        console.log(error);
      }.bind(this));
    }

    // @ChatBot :  creating default general topic
    createGeneral()
    {
      Axios({
        url: '/channel/createChannelsArray',
        method: 'post'})
      .then(function(response)
      {
        this.getAllChannels();
      }.bind(this))
      .catch(function(error)
      {
        console.log(error);
      }.bind(this));

    }

    componentDidMount()
    {
        // @ChatBot :  method while page loading get chat history for general topic
      this.createGeneral();
      let data = ({value:'General',type:'channel'});
      this.handleChannel(data);
      let name = Cookie.load('username');
      this.setState({socketUser:name});
      let email = Cookie.load('email');
      this.setState({socketMail:email})

      // @ChatBot : getting Topics list from socket
      socket.on('channels',(channelArray) =>
      {
        this.setState({channelArray:channelArray});
      });

      // @ChatBot : getting usernames from socket
      socket.on('usernames', (data) =>
      {
          this.setState({userNames:data});
      });

      // @ChatBot :  display all messages of topics
      socket.on("display_all_msgs", (data) =>
      {
        let msgArray=this.state.chatDetails;
        msgArray.push({date:data.date,message:data.message,senderName:data.senderName});
        this.setState({chatDetails:msgArray});
      });

      // @ChatBot : getting messages for user
      socket.on('recieverMessage',(data) =>
      {
        if(this.state.chatType==='chat')
        {
          var tempArr= this.state.chatDetails;
          tempArr = tempArr.concat({name:data.senderName,message:data.msg,date:data.date});
          this.setState({chatDetails:tempArr});
        }
      });

      //Not chat code
      this.getUserInformation();
      this.getNotificationCount();
      this.getDomainInformation();
      socket.on('update label', (data) =>
      {
            this.state.counter = this.state.counter + 1;
            this.setState({counter: this.state.counter});
      });
      //end of other code
    }
    // @ChatBot :  getting chat history of user
    getChatHistory(data)
    {
      Axios({
        url: '/chat/getChat',
        method: 'POST',
        data:{senderMail:this.state.socketMail, receiverMail:data}})
      .then(function(response)
      {
        if(response.data.chat)
        {
          this.setState({chatDetails:response.data.chat});
        }
        else
        {
          this.setState({chatDetails:[]});
        }
       }.bind(this))
      .catch(function(error)
      {
        console.log(error);
      }.bind(this));

    }
    //// @ChatBot : chat functionality is ended here.

    getNotificationCount() {
        let url = '/getbroadcastmessage/count';
        Axios.get(url).then((response) => {
            this.setState({counter: response.data.count});
        }).catch((error) => {
            console.log(error);
        });
    }
    /* @Sindhujaadevi: To get the domain information */
    getDomainInformation(){
      let differentDomain = Cookie.load('differentDomain');
      if(!differentDomain){
        this.setState({activeItem:'Build'});
      }
      else{
          this.setState({activeItem:'ChatBot'});
          Cookie.remove('differentDomain');
      }
    }
    // to fetch the information about the user
    getUserInformation() {
        let self = this;
        Axios({
          url: '/userProfile',
          method: 'GET',
          data: 'json'}).then(function(response) {
            let authType = Cookie.load('authType');
            if (authType === 'facebook') {
                self.setState({name: response.data.user.facebook.displayName,
                  email: response.data.user.facebook.email,
                  photo: response.data.user.facebook.photos, usertype: false});
            } else if (authType === 'google') {
                self.setState({name: response.data.user.google.name,
                  email: response.data.user.google.email,
                  photo: response.data.user.google.photos, usertype: false});
            } else if (authType === 'local') {
                self.setState({name: response.data.user.local.name,
                email: response.data.user.local.email,
                photo: response.data.user.local.photos, usertype: true});
            }
            socket.emit('sendSocketName',{name:self.state.name,email:self.state.email});
        }).catch(function(error) {
            console.log(error);
        });
    }
    //pops dashboard modal
    onUserStats(){
        hashHistory.push('/dash')
    }
    //pops edit profile modal
    onSubmitEmail() {
        hashHistory.push('/profile');
    }
    // redirects to changepassword page
    onChangePassword() {
        hashHistory.push('/change');
    }
    retriveChat(e) {
      let flag = 0;
          Axios.get('/retriveChat').then((response) => {
            //  @Mayanka: chat history is empty if there's no response data
              if (response.data == null) {
            //  @Mayanka: set flag to one if history is empty
                flag = 1;
              }
              else{
                flag = 0;
              }this.setState({tourFlag: flag});
              if(flag == 1){
                this.setTourState();
              }
          }).catch((err) => {
          });
          }
  render() {
    //  @Mayanka: style element for user-tour
    const tourTitleStyle = {
    fontWeight: 700,
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
    color:'teal'
  };
  //  @Mayanka: style element for user-tour
  const tourMessageStyle = {
    fontSize: 16,
    paddingLeft: 10,
    paddingTop:10,
      color:'teal'
  };
        const activeItem = this.state.activeItem;
        const customername = this.state.name;
        let trigger;
        let authType = Cookie.load('authType');
        if (authType === 'local') {
            let profilepicture = Cookie.load('profilepicture');
            trigger = (
                <span>
                    <Image avatar src={require('../../../../webserver/images/' + profilepicture)}/>
                    {name = customername}
                </span>
            );
        } else if (authType === 'facebook') {
            trigger = (
                <span>
                    <Image avatar src={this.state.photo}/>
                    {name = customername}
                </span>
            );
        } else if (authType === 'google') {
            trigger = (
                <span>
                    <Image avatar src={this.state.photo}/>
                     {name = customername}
                </span>
            );
        }
        return (
            <div id="leftbarmenu">
            {/*chatBot: SideBar Code Started from here*/}
              <Sidebar as={Menu} animation='slide along' width='thin' visible={this.state.sideMenuVisible} icon='labeled' vertical inverted>
                    <Menu.Item name='Genie' active={activeItem === 'Genie'}
                      onClick={this.handleItemClick}>
                        <a href="#/clienthome">
                            <Image src='../../images/ginianim.gif' size='tiny' avatar/></a>
                    </Menu.Item>
                    <Menu.Item name='Back' active={activeItem === 'Back'}
                      onClick={this.handleItemClick}>
                        <Icon name='home' color='teal'/>
                        {LeftMenuPage.LeftMenu.Menu1}
                    </Menu.Item>
                <br />
                <h3>
                  Topics
                  <Modal open={this.state.modalSwitch} trigger={<Popup trigger = {<Icon name='add' onClick={this.modalOn} color='teal' size='medium'/>} content = 'Create New Topic' position = 'right center'/>}>
                    <Header icon='archive' content='Create New Topic' />
                    <Modal.Content>
                      <Segment inverted>
                        <Form id='channelForm' onSubmit={this.onSubmitChannelName}>
                          <input autoComplete="off" type='text' id="channelBox" name='channelName' ref='channelName' placeholder='Type Channel Name Here...'  />
                        </Form>
                        <br/>
                        <Button color='green' onClick={this.onSubmitChannelName} style={{marginLeft:'600px'}}>
                          <Icon name='sign in' /> Create
                        </Button>
                        <Button color='red' onClick={this.modalOff}>
                          <Icon name='close' /> Close
                        </Button>
                      </Segment>
                    </Modal.Content>
                  </Modal>
                </h3>
                <DisplayListCh setChannel={this.state.setChannel} channelArray={this.state.channelArray} handle={this.handleChannel} activeUser={this.state.activeUser}/>
                <br/><br/>
                <h3>Online Users</h3>
                <DisplayListUs setUser={this.state.setUser} allUsers={this.state.userNames} handle={this.handle} activeMail={this.state.activeMail} activeUser={this.state.activeUser} socketMail={this.state.socketMail}/>
              </Sidebar>
              {/*ChatBot: SideBar Code is Ended Here*/}
                <Sidebar as={Menu} className='fixed' animation='slide along' width='thin'
                   visible={this.state.leftMenuVisible} icon='labeled' vertical inverted>
                    <Menu.Item name='Genie' active={activeItem === 'Genie'}
                      onClick={this.handleItemClick}>
                        <a href="#/clienthome">
                            <Image src='../../images/ginianim.gif' size='tiny' avatar/></a>
                    </Menu.Item>
                    <Menu.Item name='Home' active={activeItem === 'Home'}
                      onClick={this.handleItemClick}>
                        <Icon name='home' color='teal'/>
                        {LeftMenuPage.LeftMenu.Menu1}
                    </Menu.Item>
                    <Menu.Item name='ChatBot' className="stop-1" active={activeItem === 'ChatBot'}
                      onClick={this.handleItemClick}>
                        <Icon name='chat' color='teal'/>
                        {LeftMenuPage.LeftMenu.Menu2}
                    </Menu.Item>
                    <Menu.Item name='Bookmarks' active={activeItem === 'Bookmarks'}
                      onClick={this.handleItemClick}>
                        <Icon name='save' color='teal'/>
                        {LeftMenuPage.LeftMenu.Menu3}
                    </Menu.Item>
                    <Menu.Item name='notifications' active={activeItem === 'notifications'}
                      onClick={this.handleItemClick}>
                        <Label color='red'>{this.state.counter}</Label>
                        <Icon name='alarm' color='teal'/>
                        {LeftMenuPage.LeftMenu.Menu4}
                    </Menu.Item>


                    <Menu.Item name='Articles/Book' active={activeItem === 'Articles/Book'}
                      onClick={this.handleItemClick}>
                        <Icon name='leanpub' color='teal'/>
                        {LeftMenuPage.LeftMenu.Menu6}
                    </Menu.Item>

                    <Menu.Item name='Assessment' active={activeItem === 'Assessment'}
                      onClick={this.handleItemClick}>
                        <Icon name='pencil square' color='teal'/>
                        {LeftMenuPage.LeftMenu.Menu7}
                    </Menu.Item>
                    <Menu.Item name='discussion' active={activeItem === 'discussion'}
                      onClick={this.handleItemClick}>
                        <Icon name='discussions' color='teal'/>
                        {LeftMenuPage.LeftMenu.Menu8}
                    </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher id="sidebarpusher">
                    <Segment id="segmentleftbar">
                        <div id='topmenudiv'>
                            <Menu secondary>
                                <Menu.Item>
                                    <a href="#/clienthome">
                                        <Popup trigger={< Icon name = "arrow circle left"
                                          size = "large" circular color = 'black' />}
                                          content='Back' size='mini'/>
                                    </a>
                                </Menu.Item>
                                <Menu.Item position='right'>
                                  <h3>{this.props.params.domain.toUpperCase()}</h3>
                                </Menu.Item>
                                <Menu.Item position='right'>
                                    <Dropdown trigger={trigger} pointing='top right' icon={null}>
                                        <Dropdown.Menu >
                                            <Dropdown.Item text='Dashboard' icon='building outline'
                                              disabled={(!this.state.usertype)}
                                              onClick={this.onUserStats}/>
                                            <Dropdown.Item text='Edit Profile' icon='user'
                                              disabled={(!this.state.usertype)}
                                              onClick={this.onSubmitEmail}/>
                                            <Dropdown.Item text='Change Password' icon='lock'
                                              disabled={(!this.state.usertype)}
                                              onClick={this.onChangePassword}/>
                                              <a href='#/logout'><Dropdown.Item text='Logout' icon='sign out'
                                                active={activeItem === 'LogOut'}
                                                disabled={(!this.state.usertype)}
                                                onClick={this.handleItemClick}/>
                                              </a>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Menu.Item>
                            </Menu>
                        </div>
                        <div id='leftmenucontentdiv'>
                            <LeftMenuContent chatHistory={this.state.chatDetails} activeUser={this.state.activeUser} socketUser={this.state.socketUser} type={this.state.chatType}  sidebarItemSelected={activeItem}  restart={this.restart.bind(this)} domain={this.props.params.domain} getSenderMessage={this.getSenderMessage} activeMail={this.state.activeMail} socketMail={this.state.socketMail}/>
                        </div>
                    </Segment>
                </Sidebar.Pusher>
                <div style={{position: "absolute", top: 0}}>
             <Tour
               active={this.state.isTourActive}
               step={this.state.tourStep}
               onNext={(step) => this.setState({tourStep: step})}
               onBack={(step) => this.setState({tourStep: step})}
               onCancel={() => this.setState({isTourActive: false})}
               steps={[
                     {
                       step: 1,
                       selector: ".stop-1",
                       title: <div style={tourTitleStyle}>Knowledge Hub!!</div>,
                       body: <div style={tourMessageStyle}>Click Lets Explore & start asking your queries</div>
                     }
                 ]}
             />
          </div>
            </div>
        );
    }
}
