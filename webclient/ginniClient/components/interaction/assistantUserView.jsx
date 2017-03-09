import React from 'react';
import {Feed, Image} from 'semantic-ui-react';
import './chatcontainerstyle.css';
import Cookie from 'react-cookie';

export default class AssistantView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
      /* @yuvashree: welcome message for user */
      if(this.props.userMessage === 'nil')
      {
        return (
        <div id='assistantView' >
          <div id='assistantViewUser'>
            Hi! I'm Zukti and I'll try to answer your queries on {Cookie.load('domain')}.
                <br/>Shall we get started?
              <div id='assistantViewUserDate'>{this.props.msgDate}
              </div>
          </div>
        </div>
      );
      }
      return (
        <div id='assistantView' >
          <div id='assistantViewUser'>
              {this.props.userMessage}
              <div id='assistantViewUserDate'>{this.props.msgDate}
              </div>
          </div>
        </div>
    );
    }
}
