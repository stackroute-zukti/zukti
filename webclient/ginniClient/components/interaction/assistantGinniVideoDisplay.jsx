import React from 'react';
import {Feed, Label} from 'semantic-ui-react';
import AssistantGinniMoreVideosView from './assistantGinniMoreVideosView';
import AssistantGinniOptions from './assistantGinniOptions';
import VideoPlayer from './videoPlayer';
import UnfurlLink from './unfurlLink';
import './chatcontainerstyle.css';
import CodeAssistant from '../../../Multi_Lingual/Wordings.json';

export default class AssistantGinniMixedReply extends React.Component {
    constructor(props) {
        super(props);
        this.displayMoreVideos = this.displayMoreVideos.bind(this);
        this.playVideo = this.playVideo.bind(this);
    }
    playVideo() {
        let videoUrl = this.props.videos[0].value;
        this.props.handleGinniReply([< VideoPlayer url = {
                videoUrl
            } />]);
    }
    displayMoreVideos() {
        let ginniReply = [];
        let videosResponseArray = this.props.videos;
        videosResponseArray.shift();
        videosResponseArray.forEach((video) => {
            ginniReply.push(<AssistantGinniMoreVideosView handleGinniReply={this.props.handleGinniReply} question={this.props.question} value={video.value}/>);
        });
        this.props.handleGinniReply(ginniReply);
    }
    /* @threkashri: edited code for displaying Video */
    render() {
        let videoUrl = this.props.videos[0].value;
        return (
              <Feed id="ginniview">
                  <Feed.Event>
                      <Feed.Content id = 'ginniviewKeyword'>
                          <Feed.Summary><UnfurlLink url ={videoUrl}/></Feed.Summary>
                          <Feed.Extra>
                              <Label.Group >
                                  {this.props.videos.length > 1
                                      ? <Label onClick={this.displayMoreVideos} basic color='orange' id='cursor'>
                                              View more videos</Label>
                                      : ''}
                                  <Label onClick={this.playVideo} basic color='orange' id='cursor'>Play video</Label>
                              </Label.Group>
                          </Feed.Extra>
                          <AssistantGinniOptions question={this.props.question} type='video' value={videoUrl}/>
                          <Feed.Extra id='assistantViewUserDate'>
                              {new Date().toLocaleString()}
                          </Feed.Extra>
                      </Feed.Content>
                  </Feed.Event>
              </Feed>
          );
    }
}
