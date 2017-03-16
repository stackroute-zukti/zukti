import React from 'react';
import Embedly from 'react-embedly';
import {Feed, Label, Modal} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import AssistantGinniUrlDisplay from './assistantGinniUrlDisplay';
import AssistantGinniVideoDisplay from './assistantGinniVideoDisplay';
import AssistantGinniMoreTextDisplay from './assistantGinniMoreTextDisplay';
import AssistantGinniPlainText from './assistantGinniPlainText';
import AssistantGinniOptions from './assistantGinniOptions';
import AssistantGinniKeywordResponse from './assistantGinniKeywordResponse';
import UnfurlLink from './unfurlLink';
import './chatcontainerstyle.css';
import CodeAssistant from '../../../Multi_Lingual/Wordings.json';
import ReactPlayer from 'react-player';
let Beautify = require('js-beautify').js_beautify;
import Cookie from 'react-cookie';
import Axios from 'axios';

export default class AssistantGinniMixedReply extends React.Component {
    // props validation
    static propTypes = {
        handleGinniReply: React.PropTypes.func.isRequired,
        data: React.PropTypes.object.isRequired
    };
    constructor(props) {
        super(props);
        this.displayMoreText = this.displayMoreText.bind(this);
        this.displayVideos = this.displayVideos.bind(this);
        this.displayBlogs = this.displayBlogs.bind(this);
        this.playVideo = this.playVideo.bind(this);
        this.logoutAfterWarning = this.logoutAfterWarning.bind(this);
        this.redirectDomain = this.redirectDomain.bind(this);
       }

    displayMoreText() {
        let textResponseArray = this.props.data.text;
        textResponseArray.shift();
        let ginniReply = textResponseArray.map((answer, index) => {
            return <AssistantGinniMoreTextDisplay
              question={this.props.question} textValue={answer.value}/>
        });
        this.props.handleGinniReply(ginniReply);
    }
    /* @sundaresan: video display */
    displayVideos() {
        let ginniReply = [<AssistantGinniPlainText value = 'Here is a top rated video for you' />];
        ginniReply.push(<AssistantGinniVideoDisplay
          question={this.props.question} handleGinniReply={this.props.handleGinniReply}
          videos={this.props.data.video}/>);
        this.props.handleGinniReply(ginniReply);
    }
    displayBlogs() {
        let ginniReply = [<AssistantGinniPlainText value = 'The most top rated blog for you is' />];
        ginniReply.push(<AssistantGinniUrlDisplay
          question={this.props.question} handleGinniReply={this.props.handleGinniReply}
          blogs={this.props.data.blog}/>);
        this.props.handleGinniReply(ginniReply);
    }
    logoutAfterWarning(){
     hashHistory.push('/');
  }
  /* @Sindhujaadevi: redirecting user to other domain */
  redirectDomain(){
    let differentDomain = this.props.differentDomain;
      Axios({
              method: 'PUT',
              url: '/user/setlogindomain',
              data: { email: Cookie.load('email'), domain: differentDomain}
            }).then(function (response) {
              console.log(`User's current domain load in`+ differentDomain);
            });
            Cookie.save('domain', differentDomain);
            Cookie.save('differentDomain', differentDomain);
            let url = '/question/askQuestion';
            let message = {};
            message.time = new Date().toLocaleString();
            message.value = this.props.question;
            Axios.post(url, {
                username: this.props.username,
                question: message
            }).then((response) => {
              console.log('done');});
      hashHistory.push('/chat/'+differentDomain);
      window.location.reload();
  }
  /* @yuvashree: added function to play video on clicking the button */
    playVideo() {
        let videoUrl = this.props.data.video[0].value;
    }
    render() {
          let differentDomain = this.props.differentDomain;
          let text = '';
          let data = '';
           //  : Initialize swear word count */
          let abuseCount = this.props.abuseCount;
           //  @Mayanka: check if swear is present in the current query
          let abusePresent = this.props.abusePresent;
          if (abuseCount > 3){
          //  @Mayanka: redirect to logout function
            this.logoutAfterWarning();
                  }
          else if(abuseCount == 10 ) {
            //  @Mayanka: Final warnining to the abuser
            return (
                <Feed id="ginniview">
                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Extra warning style = {{color :" red"}}>
                               {CodeAssistant.FinalWarning.message}
                             </Feed.Extra>
                         </Feed.Content>
                     </Feed.Event>
                  </Feed>
            );
          }
           // @Mayanka: check if swear is present in the current query and issue warning
          else if(abusePresent == true) {
            //  @Mayanka only 3 chances given the abuser
            let warningCount = abuseCount ;
            return (
                <Feed id="ginniview">
                    <Feed.Event>
                        <Feed.Content>
                            <Feed.Extra>
                            </Feed.Extra>
                            <Feed.Extra text style = {{color :" red"}}>
                               {CodeAssistant.InitialWarning.message}{warningCount}
                             </Feed.Extra>
                        </Feed.Content>
                     </Feed.Event>
                  </Feed>
            );
            warningCount = warningCount - 1;
          }
          /* @Sindhujaadevi: asking user for suggessions */
          else if(this.props.inOtherDomain === true){
            return (
                  <Feed id="ginniview">
                  <Feed.Event>
                      <Feed.Content id = 'ginniviewKeyword'>
                          <Feed.Summary> It seems like your question is of ' {this.props.differentDomain} ' domain </Feed.Summary>
                          <Feed.Extra style={{color:'blue'}} onClick={this.redirectDomain}> <a>Click here to go to '{this.props.differentDomain} ' domain</a></Feed.Extra>
                      </Feed.Content>
                  </Feed.Event>
                </Feed>
            );
          }
           // @Mayanka: proper reply if no swear word
  else {
    /* @yuvashree: for getting subconcepts */
    let subconcepts = '';
    if(this.props.data.concept) {
      subconcepts = this.props.data.concept.value;
      console.log(subconcepts);
      return (
            <Feed id="ginniview">
            <Feed.Event>
                <Feed.Content id = 'ginniviewKeyword'>
                    <Feed.Summary> {subconcepts} </Feed.Summary>
                </Feed.Content>
            </Feed.Event>
          </Feed>
      );
    }
    /* subconcept code ends here */

    /* @yuvashree: edited code for text view */
        let text = '';
        if(this.props.data.text) {
          text = this.props.data.text[0].value;
          let value = Beautify(text, {indent_size: 1 });
          let newvalue = value.split("\\n");
          value = newvalue.join("");
          return (
                <Feed id="ginniview">
                    <Feed.Event>
                    <Feed.Content id = 'ginniviewKeyword'>
                      <Feed.Extra extras>
                        <p>
                           {this.props.data.extras}
                       </p>
                       <br/>
                       </Feed.Extra>
                        <Feed.Summary> {text} </Feed.Summary>
                        <Feed.Extra>
                          <hr/>
                          <p>
                          Hope my answer helped you.
                          You can also view blogs and videos on it</p>
                           <Label.Group>
                               {this.props.data.blog
                                   ? <Label onClick={this.displayBlogs}
                                     basic color='orange' id='cursor'>Blogs</Label>
                                   : ''}
                               {this.props.data.video
                                   ? <Label onClick={this.displayVideos}
                                     basic color='orange' id='cursor'>Videos</Label>
                                   : ''}
                                   <AssistantGinniOptions question={this.props.question}
                                     type='text' value={text}/>
                           </Label.Group>
                       </Feed.Extra>
                    </Feed.Content>
                </Feed.Event>
              </Feed>
          );
        }
        /* @threkashri: edited code for displaying image */
      else if (this.props.data.image) {
        // text = this.props.data.image[0].value;
        let imageURL = this.props.data.image[0].value;
        console.log(imageURL);
        text = <img src={imageURL}></img>
        return (
          <Feed id="ginniview">
          <Feed.Event>
              <Feed.Content id = 'ginniviewKeyword'>
                <Feed.Extra extras>
                           {this.props.data.extras}
                 </Feed.Extra>
                  <Feed.Summary> <a title='click to open the image in new tab'
                    href={imageURL} target='_blank'>{text}</a>
                 </Feed.Summary>
                    <Feed.Extra id='assistantViewUserDate'>
                      <AssistantGinniOptions question={this.props.question}
                        type='text' value={text}/>
                    </Feed.Extra>
              </Feed.Content>
          </Feed.Event>
        </Feed>
        );
      }
        /* @yuvashree: edited code for displaying blogs */
        let blog = '';
        if(this.props.data.blog) {
          blog = this.props.data.blog[0].value;
          console.log(blog);
        return (
              <Feed id="ginniview">
              <Feed.Event>
                  <Feed.Content id = 'ginniviewKeyword'>
                    <Feed.Extra extras>
                           {this.props.data.extras}
                         </Feed.Extra>
                    <Feed.Extra>
                      <UnfurlLink url ={blog}/>
                  </Feed.Extra>
                  <Feed.Extra>
                      <Label.Group>
                          {this.props.data.blog.length - 1 > 0
                              ? <Label onClick={this.displayBlogs}
                                basic color='orange' id='cursor'>Blogs</Label>
                              : ''}
                              <AssistantGinniOptions question={this.props.question}
                                type='text' value={text}/>
                      </Label.Group>
                    </Feed.Extra>
                  </Feed.Content>
              </Feed.Event>
            </Feed>
        );
      }
      /* @yuvashree: edited code for displaying videos */
      if(this.props.data.video) {
        let video = this.props.data.video[0].value;
        console.log(video);
      return (
            <Feed id="ginniview">
            <Feed.Event>
                <Feed.Content id = 'ginniviewKeyword'>
                  <Feed.Extra extras>
                           {this.props.data.extras}
                         </Feed.Extra>
                  <Feed.Extra>
                    <UnfurlLink url ={video}/>
                </Feed.Extra>
                <Feed.Extra>
                    <Label.Group>
                        {this.props.data.video.length - 1 > 0
                            ? <Label onClick={this.displayVideos}
                              basic color='orange' id='cursor'>Videos</Label>
                            : ''}
                            <Modal
                              closeOnRootNodeClick={false}
                              closeIcon='close'
                              trigger={<Label onClick={this.playVideo} basic color='orange' id='cursor'>Play video</Label>}>
                              <Feed id='assistantView'>
                                  <Feed.Event>
                                    <Feed.Content>
                                        <Feed.Extra >
                                          <ReactPlayer height={455} width={810} url={this.props.data.video[0]} playing={false} controls={true}/>
                                        </Feed.Extra>
                                    </Feed.Content>
                                  </Feed.Event>
                                </Feed>
                            </Modal>
                              <AssistantGinniOptions question={this.props.question}
                                type='text' value={text}/>
                    </Label.Group>
                </Feed.Extra>
                </Feed.Content>
            </Feed.Event>
          </Feed>
      );
        }
        /* @rajalakshmi: edited code for displaying code snippets */
        else if(this.props.data.code){
             let code = this.props.data.code[0].value;
               let value = Beautify(code, {indent_size: 1 });
                 localStorage.setItem("code",value);
               return (
                     <Feed id="ginniview">
                         <Feed.Event>
                         <Feed.Content id = 'ginniviewKeyword'>
                             <Feed.Extra>
                               <p>
                               Click on the Code button to view the Content.
                               </p>
                               <Label.Group>
  <Modal  id ="modelcontent" closeOnRootNodeClick={false} closeIcon ='close'
    trigger ={<Label basic color='orange' id='cursor' >Code</Label>}>
    <frameset>
      <frame src="http://localhost:8080/code" style={{width:'50px'}}/>
    </frameset>
    {/* <pre>{value}</pre> */}

  </Modal>

                                        <AssistantGinniOptions question={this.props.question}
                                          type='text' value={code}/>
                                </Label.Group>
                            </Feed.Extra>
                         </Feed.Content>
                     </Feed.Event>
                   </Feed>
               );
             }
      }
    }
  }
