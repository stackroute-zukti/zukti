import React from 'react';
import ChatMessage from './chatMessage.jsx';
import { List, Image } from 'semantic-ui-react';
import './sidebar.css';
import Axios from 'axios';
export default class LeftMenuContent extends React.Component {

	  constructor(props) {
        super(props);
    }
    render(){
			return(
				<div>
					<ChatMessage chatHistory={this.props.chatHistory}  activeUser={this.props.activeUser} 
						socketUser={this.props.socketUser} type={this.props.type} />
				</div>
			);
    }
}
