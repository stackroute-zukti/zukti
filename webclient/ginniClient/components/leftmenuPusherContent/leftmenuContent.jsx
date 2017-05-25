import React from 'react';
import DefaultPage from './defaultpageclient';
import AssistanView from '../interaction/assistantChatContainer';
import Notifications from '../notification/notifications';
import BookmarkList from '../bookmarks/bookmarkList';
import Books from '../book/readBook';
import LogOut from '../logout/logout.jsx';
import Assessment from '../assessment/assessment';
import DecideDimmer from '../assessment/decider';
// @ChatBot: Component import
import SideBarContent from '../discussion/sidebarcontent.jsx';
import InputTextBox from '../discussion/inputTextBox.jsx';
import '../discussion/sidebar.css';
// @ChatBot: End of import

export default class LeftMenuContent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        switch (this.props.sidebarItemSelected) {
            case 'Home':
            case 'Build':
                {
                    let domain = this.props.domain;
                    let dataSource;
                    let image;
                    switch (domain) {
                        case 'react':
                            dataSource = 'wordings_react.json';
                            image = 'reactlogo.png';
                            break;
                        case 'design pattern':
                            dataSource = 'wordings_design_pattern.json';
                            image = 'design.png';
                            break;
                        default:
                            break;
                    }
                    return <DefaultPage dataSource={dataSource} image={image}/>;
                }
                case 'Back':
                {
                    let domain = this.props.domain;
                    let dataSource;
                    let image;
                    switch (domain) {
                        case 'react':
                            dataSource = 'wordings_react.json';
                            image = 'reactlogo.png';
                            break;
                        case 'design pattern':
                            dataSource = 'wordings_design_pattern.json';
                            image = 'design.png';
                            break;
                        default:
                            break;
                    }
                    return <DefaultPage dataSource={dataSource} image={image}/>;
                }
            case 'ChatBot':
                {
                    return <AssistanView/>;
                }

            case 'Bookmarks':
                {
                    return <BookmarkList/>;
                }
            case 'notifications':
                {
                    return <Notifications/>;
                }
            case 'LogOut':
                {
                    return <LogOut/>
                }
            case 'Articles/Book':
                {
                    return <Books/>
                }
            case 'Assessment':
                {
                    return <DecideDimmer />
                }
            case 'discussion':
                {
                    return <div><div id="messageContent"><SideBarContent chatHistory={this.props.chatHistory} activeUser={this.props.activeUser} socketUser={this.props.socketUser} type={this.props.type} /></div><div><InputTextBox getSenderMessage={this.props.getSenderMessage} type={this.props.type} activeMail={this.props.activeMail} activeUser={this.props.activeUser} socketMail={this.props.socketMail} socketUser={this.props.socketUser}/></div></div>
                }

        }
    }
}
