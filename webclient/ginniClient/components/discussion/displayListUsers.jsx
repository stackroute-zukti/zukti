import React from 'react';
import { List, Label, Icon} from 'semantic-ui-react';
import Axios from 'axios';
import './sidebar.css'
export default class DisplayListUsers extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
          notification : '',
          activeItem: ''
       };
       this.handleItemClick=this.handleItemClick.bind(this);
       this.updateNotification=this.updateNotification.bind(this);
       this.getNotification=this.getNotification.bind(this);
   }

   // @ChatBot : get username by clicking
   handleItemClick(e,obj)
   {
     e.preventDefault();
     this.props.handle(this.props.username.email);
     this.props.handleItem({email:this.props.username.email,name:this.props.username.name, type:'chat'});
     this.updateNotification(this.props.username.email);
     let count = '';
     this.setState({notification: count});
     socket.emit('changeNotification',{senderName: this.props.username.name});
     document.getElementById("messageContent").scrollTop = document.getElementById("messageContent").scrollHeight;
   }

   // @ChatBot: update notification in mongoDB
   updateNotification(sender)
   {
       let counter=0;
       let count = '';
       if(this.state.notification !== '')
       {
           socket.emit('changeNotification',{senderName: this.props.username});
           Axios({
               url: '/chat/updateCounter',
               method: 'POST',
               data:{
                   senderMail:sender,
                   receiverMail:this.props.socketMail,
                   senderName:this.props.username.name,
                   updateCounter: counter
               }})
             .then(function(response)
                {
                    this.setState({notification: count});
                    this.getNotification();
                }.bind(this))
             .catch(function(error)
              {
                  console.log(error);
              }.bind(this));
          }
     }

  // @ChatBot : get notification from mongoDB
  getNotification()
  {
      Axios({
          url: '/chat/getChat',
          method: 'POST',
          data:{
              senderMail:this.props.username.email,
              receiverMail:this.props.socketMail
            }})
        .then(function(response)
         {
             if(response.data)
             {
                 if(response.data.senderName === this.props.username.name && response.data.senderCount !==0)
                 {
                     this.setState({notification: response.data.senderCount})
                 }
                 else if(response.data.receiverName === this.props.username.name && response.data.receiverCount !==0)
                 {
                     this.setState({notification: response.data.receiverCount})
                 }
         }}.bind(this))
        .catch(function(error)
        {
           console.log(error);
        }.bind(this));
  }

   componentDidMount()
   {
       this.getNotification();
       socket.on('count', (data) =>
        {
            if(data.sender === this.props.username.name )
            {
                if(this.props.activeUser !== data.sender)
                {
                    this.setState({notification: data.count});
                }
                else
                {
                    let count = '';
                    this.setState({notification: count});
                    this.updateNotification(this.props.activeMail);
                }
            }
      });
    }

   render()
   {
       const activeItem  = this.props.activeItem;
       let name = this.props.username.email;
       let username=this.props.username.name.split(' ');
        return (
            <List.Item onClick={this.handleItemClick} as='a' active={(activeItem===name)?this.props.setUser:false}>
                <List.Content verticalAlign='middle' floated="left">
                    <Icon  size='big' color='teal' name='user' /> {username[0]}{this.state.notification > 0 ? <Label color='red' circular>{this.state.notification}</Label>: null}
                </List.Content>
            </List.Item>
       );
   }
}
