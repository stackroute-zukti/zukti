import React from 'react';
import {Feed, Label} from 'semantic-ui-react';
import UnfurlLink from './unfurlLink';
import AssistantGinniOptions from './assistantGinniOptions';
import VideoPlayer from './videoPlayer';
import CodeAssistant from '../../../Multi_Lingual/Wordings.json';

export default class AssistantGinniMoreVideosView extends React.Component {
    // props validation
    constructor(props) {
        super(props);
        this.playVideo = this.playVideo.bind(this);
    }
    playVideo() {
        let videoUrl = this.props.value;
        this.props.handleGinniReply([< VideoPlayer url = {
                videoUrl
            } />]);
    }
    /* @threkashri: edited code for displaying more Videos */
    render() {
      return (
        <Feed id="ginniview">
            <Feed.Event>
                <Feed.Content id = 'ginniviewKeyword'>
                    <Feed.Summary><UnfurlLink url={this.props.value}/></Feed.Summary>
                    <AssistantGinniOptions question={this.props.question} type='video' value={this.props.value}/>
                    <Label onClick={this.playVideo} basic color='orange' id='cursor'>Play video</Label>
                    <Feed.Extra id='assistantViewUserDate'>
                        {new Date().toLocaleString()}
                    </Feed.Extra>
                </Feed.Content>
            </Feed.Event>
        </Feed>
    );
    }
}
