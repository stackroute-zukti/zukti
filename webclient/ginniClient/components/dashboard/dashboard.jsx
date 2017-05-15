import React from 'react';
import {Button,Modal,Icon,Grid,Segment,Menu,Image,Label,Dropdown} from 'semantic-ui-react';
import {hashHistory} from 'react-router';
import Dropzone from 'react-dropzone';
import Axios from 'axios';
import validator from 'validator';
import Cookie from 'react-cookie';
import DashboardContent from './dashboardcontent';
// import { DateField, Calendar } from 'react-date-picker';
import $ from 'jquery';
import DatePicker from 'react-datepicker';
import moment from 'moment';


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
            startDate:moment()

        };
        this.fetchValuesFromDatabase = this.fetchValuesFromDatabase.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.close = this.close.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
                            this.setState({totalScore:temp});
                            this.setState({obtainedScore:response[0][authType].assessment.score});
                            this.setState({fluke:response[0][authType].assessment.noOfFluke});
                            this.setState({percentageFluke:Math.round(response[0][authType].assessment.fluke)});
                            this.setState({rank:response[0][authType].assessment.rank})
                          }.bind(this),
                          error: function(err) {
                                  console.log(err);
                          }.bind(this)
                  });
    }
    
    handleChange = function handleChange(selectedDate) {
    this.setState({
          startDate: selectedDate
    });
  }

    render() {
        const profilepicture = Cookie.load('profilepicture');
        const {open,activeItem} = this.state;
        return ( 
            <div className='dash'>
            <Modal size='small' open={open} Icon='close' onClose={this.close}   onMount={this.fetchValuesFromDatabase}       
                         closeOnRootNodeClick={false} size="tiny" closeIcon='close' id='modallogincss' >
                       <Modal.Header>
                       <Image avatar src={require('../../../../webserver/images/' + profilepicture)}/>
                       User Dashboard
                       </Modal.Header>
                         <Grid>
                           <Grid.Column width={4}>
                               
                             <Menu fluid vertical tabular pointing secondary  >
                               <Menu.Item name='Stat' text='123' type='234\' active={activeItem === 'Stat'} onClick={this.handleItemClick}/>
           
                               <Dropdown name='Performance Graph' text='Performance Graph' pointing='left' className='link item'>
                               <Dropdown.Menu>
                               <Dropdown.Item name='Overall' active={activeItem==='overall'} onClick={this.handleItemClick}>From the beginning</Dropdown.Item>
                               <Dropdown.Item name='ParticularDate' active={activeItem==='ParticularDate'} onClick={this.handleItemClick}>Particular Date</Dropdown.Item>
                               <Dropdown.Item name='RangeOfDates' active={activeItem==='RangeOfDates'} onClick={this.handleItemClick}>Range Of Dates</Dropdown.Item>
                               </Dropdown.Menu>
                                </Dropdown>
                             </Menu>
                           </Grid.Column>
           
                           <Grid.Column stretched width={12}>
                           <DashboardContent item={activeItem} rank={this.state.rank} score={this.state.obtainedScore} totalScore={this.state.totalScore}
                             totalQuestions={this.state.totalQuestions} fluke={this.state.fluke} percentageFluke={this.state.percentageFluke} />
                           </Grid.Column>
                         </Grid>
                       </Modal>
                       
            </div>
        );
    }
}
