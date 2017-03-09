import React from 'react';
import {Feed} from 'semantic-ui-react';
import ReactPlayer from 'react-player';
import './chatcontainerstyle.css';
import CodeAssistant from '../../../Multi_Lingual/Wordings.json';

export default class AssistantView extends React.Component {
    constructor(props) {
        super(props);
    }
    /* @threkashri: edited code for displaying Video Link */
    render() {
      return (
          <Feed id='assistantView'>
              <Feed.Event>
                  <Feed.Content>
                      <Feed.Summary >
                          <ReactPlayer url={this.props.url} playing={false} controls={true}/>
                      </Feed.Summary>
                      <Feed.Extra id='assistantViewUserDate'>
                          {new Date().toLocaleString()}
                      </Feed.Extra>
                  </Feed.Content>
              </Feed.Event>
          </Feed>

      );
    }
}
