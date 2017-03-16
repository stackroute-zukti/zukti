import React from 'react';
import {Image, Icon, Divider, Grid, Popup} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import Axios from 'axios';
import Cookie from 'react-cookie';
import './homestyle.css';
import ClientHomePage from '../../../Multi_Lingual/Wordings.json';
export default class ClientHome extends React.Component {

  constructor() {
      super();

      this.onSubmitEmail = this.onSubmitEmail.bind(this);
  }
/* if the user clicks logout it clears all the cookies
which is stored when user login and redirect to apphome */
    handleLogout()
    {
      Axios({
              method: 'GET',
              url: '/signout',
              data: 'json'
            }).then(function (response) {
              let socket = io();
              /* @ramvignesh: event to update the user list */
              socket.emit('updateUserList');

              Cookie.remove('authType');
              Cookie.remove('token');
              hashHistory.push('/');
            })
             .catch(function (error) {
                 console.log(error);
            });
    }
    // redirects to chat page
    onSubmitEmail(e) {
      console.log(Cookie.load('email')+" in home.jsx onSubmitEmail");
      let socket = io();
      switch(e.target.alt) {
        case 'react':
        Axios({
                method: 'PUT',
                url: '/user/setlogindomain',
                data: { email: Cookie.load('email'), domain: 'react'}
              }).then(function (response) {
                console.log(response+" :response");
                console.log(`User's current domain: ${e.target.alt}`);
              })
               .catch(function (error) {
                   console.log(error);
              });
          Cookie.save('domain','REACT');
          console.log(Cookie.load('domain'));
          socket.emit('updateUserList');
          hashHistory.push('/chat/react');
          break;
        case 'design pattern':
        Axios({
                method: 'PUT',
                url: '/user/setlogindomain',
                data: { email: Cookie.load('email'), domain: 'design pattern'}
              }).then(function (response) {
                console.log(`User's current domain: ${e.target.alt}`);
              })
               .catch(function (error) {
                   console.log(error);
              });
              Cookie.save('domain','DESIGN PATTERN');
              console.log(Cookie.load('domain'));
              socket.emit('updateUserList');
              hashHistory.push('/chat/design pattern');
          break;
        default:
          break;
      }

    }
    render() {
        return (
            <div style={{
                backgroundImage: "url('../../images/homepage.jpg')"
            }}>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={2}/>
                        <Grid.Column width={10}/>
                        <Grid.Column width={4}>
                            <Popup offset={-140} positioning='left center' trigger={<center>
                              <Icon name='sign out' size='large' inverted id='iconstyle'
                                 onClick={this.handleLogout.bind(this)}/>
                               </center>} content='Logout'/>
                        </Grid.Column>
                    </Grid.Row>
                    <Divider horizontal inverted>
                        <h2 id='headsparkle'>{ClientHomePage.ClientHome.Heading1}
                          <br/>{ClientHomePage.ClientHome.Heading2}
                        </h2>
                    </Divider>
                    <Grid.Row divided vertically>
                        <Grid.Column width={2}/>
                        <Grid.Column width={4} centered={true}>
                            <Grid.Row>
                                <center>
                                    <Image className="imagepointer" src='../../images/react.jpg'
                                    alt='react' size='small' avatar onClick={this.onSubmitEmail}/>
                                </center>
                            </Grid.Row>
                            <Grid.Row>
                                <center>
                                    <h2 className="heading1"
                          onClick={this.onSubmitEmail}>{ClientHomePage.ClientHome.Topic1}</h2>
                                </center>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={4} centered={true}>
                            <Grid.Row>
                                <center>
                          <Image className="imagepointer" src='../../images/designlogo.png'
                          alt='design pattern' size='small' avatar onClick={this.onSubmitEmail}/>
                                </center>
                            </Grid.Row>
                            <Grid.Row>
                                <center>
                                    <h2 className="heading2"
                              onClick={this.onSubmitEmail1}>{ClientHomePage.ClientHome.Topic2}</h2>
                                </center>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Grid.Row>
                                <center>
                                    <Image src='../../images/java.jpg' size='small' avatar/>
                                </center>
                            </Grid.Row>
                            <Grid.Row>
                                <center>
<h2 className="heading3">{ClientHomePage.ClientHome.Topic3}</h2>
                                </center>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={2}/>
                    </Grid.Row>
                    <Grid.Row divided vertically>
                        <Grid.Column width={2}/>
                        <Grid.Column width={4}>
                            <Grid.Row>
                                <center>
                                  <Image src='../../images/js.jpg' size='small' avatar/>
                                </center>
                            </Grid.Row>
                            <Grid.Row>
                                <center>
                        <h2 className="heading4">{ClientHomePage.ClientHome.Topic4}</h2>
                                </center>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Grid.Row>
                                <center>
                                    <Image src='../../images/node.jpg' size='small' avatar/>
                                </center>
                            </Grid.Row>
                            <Grid.Row>
                                <center>
                                <h2 className="heading5">{ClientHomePage.ClientHome.Topic5}</h2>
                                </center>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Grid.Row>
                                <center><Image src='../../images/plus2.jpg' size='small' avatar/>
                                </center>
                            </Grid.Row>
                            <Grid.Row>
                                <center>
                                  <h2 className="heading6">{ClientHomePage.ClientHome.Topic6}</h2>
                                </center>
                            </Grid.Row>
                        </Grid.Column>
                        <Grid.Column width={2}/>
                    </Grid.Row>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/><br/><br/>
                </Grid>
            </div>
        );
    }
}
