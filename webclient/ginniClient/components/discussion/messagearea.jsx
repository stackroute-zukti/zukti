import React, { Component } from 'react'
import { List, Label, Divider, Message, Grid } from 'semantic-ui-react'
import './sidebar.css'
import moment from 'moment';

export default class MessageArea extends React.Component {
  constructor(props) {
      super(props);
  }

  componentDidMount()
  {
    document.getElementById("messageContent").scrollTop = document.getElementById("messageContent").scrollHeight;
 }

  render()
   {
       let messageDate=new Date(this.props.messageDetails.date).toLocaleString().split(',');
       messageDate[1]=messageDate[1].replace(/:\d+ /, ' ');

       return (
        <div>
        {(this.props.messageDate)?
          (<div id='displayDate'><Message><Divider horizontal>{moment(this.props.messageDate, 'M/D/Y').format('ll')}</Divider></Message></div>)
          :(<div></div>)
        }
        {(this.props.type === 'channel')?
          <Grid>
           {(this.props.socketUser === this.props.messageDetails.senderName)?
              <Grid.Column  width={5} className='messageOfGroupSender'>
                <List>
                  <List.Item>
                    <List.Content>
                      <List.Header as='a'>{this.props.messageDetails.senderName.toUpperCase()}</List.Header>
                      <br />
                      <List.Description id="displayMessage">{this.props.messageDetails.message}</List.Description>
                       <List.Description id="displayTime">{messageDate[1]}</List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>:
              <Grid.Column  width={5} className='messageOfReceiver'>
                <List>
                  <List.Item>
                    <List.Content>
                      <List.Header as='a'>{this.props.messageDetails.senderName.toUpperCase()}</List.Header>
                      <br />
                      <List.Description id="displayMessage">{this.props.messageDetails.message}</List.Description>
                      <List.Description id="displayTime">{messageDate[1]}</List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Grid.Column>
            }
          </Grid>:
          <Grid>
            {(this.props.activeUser===this.props.messageDetails.name)?
              <Grid.Column width={5} className='messageOfReceiver'>
                <List>
                  {(this.props.activeUser===this.props.messageDetails.name)||(this.props.socketUser===this.props.messageDetails.name)?
                    <List.Item>
                      <List.Content>
                        <List.Header as='a'>{this.props.messageDetails.name.toUpperCase()}</List.Header>
                        <br />
                         <List.Description id="displayMessage">{this.props.messageDetails.message}</List.Description>
                         <List.Description id="displayTime">{messageDate[1]}</List.Description>
                      </List.Content>
                    </List.Item>:''
                  }
                </List>
              </Grid.Column>:
              <Grid.Column>
                {(this.props.socketUser===this.props.messageDetails.name)?
                  <Grid.Column  width={5} className='messageOfSender'>
                    <List >
                      {(this.props.activeUser===this.props.messageDetails.name)||(this.props.socketUser===this.props.messageDetails.name)?
                        <List.Item >
                          <List.Content>
                            <List.Header as='a'>{this.props.messageDetails.name.toUpperCase()}</List.Header>
                            <br />
                            <List.Description id="displayMessage">{this.props.messageDetails.message}</List.Description>
                            <List.Description id="displayTime">{messageDate[1]}</List.Description>
                          </List.Content>
                        </List.Item>:''
                      }
                    </List>
                  </Grid.Column>:''
                 }
              </Grid.Column>
            }
                </Grid>
        }
        </div>
    )
  }
}
