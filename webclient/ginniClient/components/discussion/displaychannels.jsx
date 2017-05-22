import React, { Component } from 'react'
import { List, Icon } from 'semantic-ui-react';
import Axios from 'axios';
import './sidebar.css';
export default class DisplayListChannels extends React.Component {
   constructor(props) {
       super(props);
       this.handleItemClick=this.handleItemClick.bind(this);
   }

   // @ChatBot : send clicked topic to parent to display chat history
  handleItemClick(e)
   {
     e.preventDefault();
     this.props.handle(this.props.channelName.key);
     this.props.handleItem({value:this.props.channelName.key,type:'channel'});
     document.getElementById("messageContent").scrollTop = document.getElementById("messageContent").scrollHeight;
  }

  render() {
      const activeItem  = this.props.activeItem;
      let channelName = this.props.channelName.key;
       return (
         <List.Item onClick={this.handleItemClick} as='a' active={(activeItem===channelName)?this.props.setChannel:false}>
          <List.Content verticalAlign='middle' floated="left">
            <Icon  size='big' color='teal' name='student' /> {this.props.channelName.key}
          </List.Content>
        </List.Item>

      );
   }
}
