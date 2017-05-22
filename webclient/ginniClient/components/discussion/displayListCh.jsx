import React, { Component } from 'react'
import DisplayListChannels from './displaychannels.jsx'
import { List } from 'semantic-ui-react'
export default class DisplayListCh extends React.Component{

 constructor(props) {
        super(props);
        this.state = {
          activeItem: 'General'
        };
        this.handle = this.handle.bind(this);
      }

      // @Chatbot : to change the active state of topic
      handle(data)
      {
        this.setState({activeItem: data});
      }

      render()
      {
        let channelName=this.props.channelArray.map(function(data, index){
        return(
              <DisplayListChannels setChannel={this.props.setChannel} key={index} channelName={data}
              handleItem={this.props.handle} activeUser={this.props.activeUser}
              handle = {this.handle} activeItem = {this.state.activeItem} />
          );
      }.bind(this))
        return(
            <List>
             {channelName}
            </List>
          )
      }
}
