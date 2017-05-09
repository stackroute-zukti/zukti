import React from 'react';
import {Button,Modal,Icon,Grid,Segment,Menu,Image,Label} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import validator from 'validator';
import Cookie from 'react-cookie';
import DashboardContent from './dashboardcontent';
import $ from 'jquery';
import GraphData from './graph.jsx'

export default class Dashboard extends React.Component
{
    constructor(props) {
        super(props);
        // setting default values to the state variables
        this.state = {
            open:true,
            allFiles: [],
            email: '',
            firstname: '',
            lastname: '',
            activeItem: 'Stat',
            totalQuestions:0,
            rank:0,
            totalScore:0,
            obtainedScore:0,
            fluke:0,
            percentageFluke:0,

        };
        this.fetchValuesFromDatabase = this.fetchValuesFromDatabase.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.close = this.close.bind(this);
    }

    //handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    handleItemClick = function handleItemClick(e,req) {
        // body...
        var name = req.name;
        this.setState({activeItem:name});
        this.fetchValuesFromDatabase(name);
    };
    //close the modal window
    close = () => hashHistory.push('/chat/react');

    // componentDidMount(){
    //     this.fetchValuesFromDatabase();
    // }
    //fetch values from database
    fetchValuesFromDatabase = function fetchValuesFromDatabase(name){
        var email = Cookie.load('email');
        var authType = Cookie.load('authType');
        var userDetails=[];

        $.ajax({
                          url: '/dashboard/fetch',
                          type: 'POST',
                          data: {
                            id:email,
                            authType:authType
                          },
                          success: function(response) {

                            let temp = response[0][authType].assessment.totalQuestionsAttempted;
                            this.setState({totalQuestions:temp})
                            temp = temp * 10;
                            console.log('temp',temp)
                            console.log('temp1',temp*10)
                            this.setState({totalScore:temp});
                            this.setState({obtainedScore:response[0][authType].assessment.score});
                            this.setState({fluke:response[0][authType].assessment.noOfFluke});
                             this.setState({percentageFluke:response[0][authType].assessment.fluke});
                            this.setState({rank:response[0][authType].assessment.rank})
                          }.bind(this),
                          error: function(err) {
                                  console.log(err);
                          }.bind(this)
                  });
        // console.log('userDetails',userDetails);
        // let t_Score = userDetails
        // this.setState({totalScore:})
    }
    

    render() {
        const profilepicture = Cookie.load('profilepicture');
        const {open,activeItem} = this.state;
        return ( 
            <div classNmae='dash'>
            <Modal size='small' open={open} Icon='close' onClose={this.close}   onMount={this.fetchValuesFromDatabase}       
              closeOnRootNodeClick={false} size="tiny" closeIcon='close' id='modallogincss' >
            <Modal.Header>
            <Image avatar src={require('../../../../webserver/images/' + profilepicture)}/>
            User Dashboard
            </Modal.Header>
              <Grid>
                <Grid.Column width={4}>
                    
                  <Menu fluid vertical tabular pointing secondary  >
                    <Menu.Item name='Stat' active={activeItem === 'Stat'} onClick={this.handleItemClick}/>
                    <Menu.Item name='Graph' active={activeItem === 'Graph'} onClick={this.handleItemClick} />
                    {/*<Menu.Item inline name='Followers' active={activeItem === 'Followers'} onClick={this.handleItemClick}>
                                        Followers
                                        <Label circular size='mini' color='blue'></Label>
                                        </Menu.Item>
                                        <Menu.Item name='Following' active={activeItem === 'Following'} onClick={this.handleItemClick}>
                                        Following
                                        <Label circular size='mini' color='blue'></Label>
                                        </Menu.Item>*/}
                  </Menu>
                </Grid.Column>

                <Grid.Column stretched width={12}>
     <DashboardContent item={activeItem} rank={this.state.rank} score={this.state.obtainedScore} totalScore={this.state.totalScore}
      totalQuestions={this.state.totalQuestions} fluke={this.state.fluke} percentageFluke={this.state.percentageFluke} />
      {/*<GraphData totalScore={this.state.totalScore} obtainedScore={this.state.obtainedScore}
             fluke={this.state.fluke} percentageFluke={this.state.percentageFluke}/ >*/}
                </Grid.Column>
              </Grid>
            </Modal>
            </div>
        );
    }
}
