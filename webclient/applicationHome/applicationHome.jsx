import React from 'react';
import {Grid, Button} from 'semantic-ui-react';
// import {Grid} from 'semantic-ui-react/collections/Grid';
// import {Button} from 'semantic-ui-react/elements/Button/Button.js';
import './applicationHome.css';
import ApplicationHome from '../Multi_Lingual/Wordings.json';
export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {message:''}
    }
    componentDidMount()
    {
        if(this.props.location.query.response === 'facebook')
        {
            this.setState({message:"You have already registered using facbook account with same email id. Please login with facebook"});
        }
        else if(this.props.location.query.response === 'google')
        {
            this.setState({message:"You have already registered using google account with same email id. Please login with google"});
        }
        else if(this.props.location.query.response === 'local')
        {
            this.setState({message:"You have already registered with same email id. Please login with your userid and password"});
        }

    }

    render() {
        return (
            <div style={{
                backgroundImage: "url('../../images/intro-bg.gif')",
                height: '100%',
                width: '100%'
            }}>
                <Grid container={true} centered={true}>
                    <Grid.Row/>
                    <Grid.Row>
                        <Grid.Column width={2}>
                            <h1 id="genie">{ApplicationHome.ApplicationContent.Heading}</h1>
                        </Grid.Column>
                        <Grid.Column width={9}/>
                        <Grid.Column width={5}>
                            <h2>
                                <a href='#/login'>
                                    <Button className="buttonlogin" circular style={{
                                        backgroundColor: 'white'
                                    }}>LOGIN
                                    </Button>
                                </a>
                                &nbsp;&nbsp;<a href='#/signup'>
                                    <Button className="buttonsignin" circular style={{
                                        backgroundColor: 'white'
                                    }}>SIGNUP
                                    </Button>
                                </a>
                            </h2>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row>
                        <Grid.Column style={{
                            textAlign: 'center'
                        }}>
                            <div id='head1'>{ApplicationHome.ApplicationContent.Line1}<br/>
                              {/* <h5 id='head2'>{ApplicationHome.ApplicationContent.Line2}</h5> */}
                                <h2 id='head3'>
                                    <i>{ApplicationHome.ApplicationContent.Line3}</i>
                                </h2>
                                <h3 id='head3'>
                                    <i>{this.state.message}</i>
                                </h3>
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row>
                        {/* <a href="http://www.pcadvisor.co.uk/feature/software/what-are-bots-facebook-messenger-skype-skyscanner-3638979/" id="head" style={{
                            color: 'black'
                        }}>
                            <Button className="buttonlogin" circular style={{
                                backgroundColor: 'white'
                            }}>EXPLORE</Button>
                        </a> */}
                    </Grid.Row>
                    <Grid.Row/>
                    <Grid.Row/>
                    <Grid.Row/>
                    <br/><br/>
                </Grid>
                <div style={{
                 position: 'absolute',
                 top: '0px',
                 left: '0px',
                 backgroundRepeat: 'no-repeat',
                 backgroundImage: "url('../../images/logo.gif')",
                 width: '50%',
                 height: '50%',
                 zIndex: 2
             }}></div>
            </div>
        );
    }
}
