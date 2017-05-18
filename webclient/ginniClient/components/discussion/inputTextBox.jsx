import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';
import ReactDOM from 'react-dom';

export default class InputTextBox extends React.Component {
     constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
    }
    // @ChatBot : get user typed message from text box
    handleUserInput(e)
    {
        e.preventDefault();
        let inputMessage = ReactDOM.findDOMNode(this.refs.userInput).value;
        if(inputMessage.trim() === '')
        {
          return;
        }
        ReactDOM.findDOMNode(this.refs.userInput).value = '';
        if(this.props.type === 'channel')
        {
          this.props.getSenderMessage({message: inputMessage})
        }
        else
        {
          let inputDate=new Date().toString();
          let senderMsg={senderMail:this.props.socketMail,receiverMail:this.props.activeMail,
            senderName:this.props.socketUser,receiverName:this.props.activeUser,
            msg:inputMessage,date:inputDate};
          socket.emit('sendMessage',senderMsg);
          this.props.getSenderMessage({name:this.props.socketUser,message:inputMessage,date:inputDate});

        }
        document.getElementById("messageContent").scrollTop = document.getElementById("messageContent").scrollHeight;
    }


  render() {

    return (
      <div >
        <Form id='textForm' onSubmit={this.handleUserInput}>
          <input autoComplete="off" type='text' id="inputbox"
            name='userInput' ref='userInput' placeholder='Type Your Message Here...'  />
        </Form>
      </div>
    )
  }
}
