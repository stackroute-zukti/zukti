import React, { Component } from 'react'
import DisplayListUsers from './displayListUsers.jsx'
import {List} from 'semantic-ui-react'
export default class DisplayListUs extends React.Component{
 constructor(props) {
        super(props);
        this.state={
          activeItem : ''
        }
        this.handle = this.handle.bind(this);
      }

      // @Chatbot : to change the active state of user
      handle(data)
      {
        this.setState({activeItem: data});
      }

      render()
      {
        let allUsers=this.props.allUsers.map(function(data, index){
          if(this.props.socketMail !== data.email)
          {
            return(
                  <DisplayListUsers setUser={this.props.setUser} username={data}
                  handleItem={this.props.handle} activeMail={this.props.activeMail}
                  handle={this.handle} activeItem={this.state.activeItem}
                  socketMail={this.props.socketMail} activeUser={this.props.activeUser} />
               );
          }
        }.bind(this));
        return(
            <List>
             {allUsers}
            </List>
          );
      }
}
