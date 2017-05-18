import React, { Component } from 'react';
import { Grid} from 'semantic-ui-react';
import MessageArea from './messagearea.jsx';
import './sidebar.css';

export default class ChatMessage extends React.Component {
  
  render() {
      let firstMsgDate ='';
      if(this.props.chatHistory[0])
      {
        firstMsgDate = new Date(this.props.chatHistory[0].date).toLocaleString().split(',');
      }
      let chatMsg=this.props.chatHistory.map(function(data,index){
        let messageDate=new Date(data.date).toLocaleString().split(',');
        if(index===0){
        }
        else if(firstMsgDate[0]===messageDate[0])
        {
          messageDate[0]='';
        }
        else {
          firstMsgDate[0]=messageDate[0];
        }
        return(
          <MessageArea key={index} messageDetails={data} 
          activeUser={this.props.activeUser} socketUser={this.props.socketUser}
          messageDate={messageDate[0]} type={this.props.type} />
        );
      }.bind(this))
    return (
     
          <div>
            {chatMsg}
          </div>
    
    )
  }
}
