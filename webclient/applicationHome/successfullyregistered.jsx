import React from 'react';
import {hashHistory} from 'react-router';
import {Grid, Button} from 'semantic-ui-react';
import './applicationHome.css';
import SuccessfullyregisteredPage from '../Multi_Lingual/Wordings.json';
export default class SuccessfullyRegistered extends React.Component {
  constructor() {
    super();
    /* @ramvignesh: binding methods to this component */
    this.logIn = this.logIn.bind(this);
    this.signUp = this.signUp.bind(this);
  }
  /* @ramvignesh: redirecting to login page */
  logIn() {
      hashHistory.push('/login');
  }
  /* @ramvignesh: redirecting to signup page */
  signUp() {
      hashHistory.push('/signup');
  }
  render() {
    return(
      <div style={{ backgroundImage: "url('../../images/homes.jpg')"}} >
      <Grid container={'true'} centered={'true'}>
      <Grid.Row/>
      <Grid.Row>
      <Grid.Column width={2}>
      <h1 id="genie">{SuccessfullyregisteredPage.Verified.Heading1}</h1>
      </Grid.Column>
      <Grid.Column width={9} />
      <Grid.Column width={5}>
        <h2>
            {/* @ramvignesh: login button */}
            <Button onClick={this.logIn} className="buttonlogin" circular style={{
                backgroundColor: 'white'
            }}>
                LOGIN
            </Button>
            &nbsp;&nbsp;
            {/* @ramvignesh: signup button */}
            <Button onClick={this.signUp} className="buttonsignin" circular style={{
                backgroundColor: 'white'
            }}>
                SIGNUP
            </Button>
        </h2>
      </Grid.Column>
      </Grid.Row>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row>
      <Grid.Column style={{textAlign: 'center'}}>
      <p id='head1'>{SuccessfullyregisteredPage.Verified.Heading2}<br/>
   </p>
      </Grid.Column>
      </Grid.Row>
      <Grid.Row/>
      <Grid.Row><h2>{SuccessfullyregisteredPage.Verified.Heading3}</h2></Grid.Row>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      <Grid.Row/>
      </Grid>
      </div>
      );
}
}
