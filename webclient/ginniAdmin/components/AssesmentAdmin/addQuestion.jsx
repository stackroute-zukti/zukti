import React from 'react';
import {Form, Grid, Button, Dropdown, Input, Icon, Divider} from 'semantic-ui-react';
import './AdminAssesment.css';
import Config from '../../../../config/url';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import TestDomainDropdown from './TestDomainDropdown';
import TestConceptDropdown from './TestConceptDropdown';

export default class AddQuestion extends React.Component {
    constructor(props) {
      super(props);
      this.createTestQuestion = this.createTestQuestion.bind(this);
      this.getTestDomain = this.getTestDomain.bind(this);
      this.getTestConcept = this.getTestConcept.bind(this);
      this.getTestConceptDropdown=this.getTestConceptDropdown.bind(this);
      this.state = {
        TestDomainValue: '',
        TestConceptValue: '',
        opensnackbar: false,
        snackbarMsg: '',
        TestDomain: [],
        TestConcept: []
      };
        };
        componentDidMount() {
            let url = Config.url + '/assesment/getTestDomain';
            Axios.get(url).then((response) => {
              let TestDomain = response.data._fields[0];
              TestDomain.forEach((TestDomain) => {
                  this.state.TestDomain.push({text: TestDomain, value: TestDomain});
              });

           }).catch((error) => {
                console.log(error);
            });
        }

       getTestConceptDropdown(TestDomain) {
            let url = Config.url + '/assesment/getTestConcept';
            let TestDomainvalue = TestDomain;


           Axios.post(url ,{
              TestDomainvalue: TestDomainvalue

           }).then((response) => {

                     let TestConcept = response.data._fields[0];
                     TestConcept.forEach((TestConcept) => {
                          this.state.TestConcept.push({text: TestConcept, value: TestConcept});
                      });


           }).catch((error) => {
                console.log(error);
            });
        }



       getTestDomain(TestDomain) {
                 this.setState({TestDomainValue: TestDomain});
                 this.getTestConceptDropdown(TestDomain);
                 this.setState({TestConcept:[]});


           }
        getTestConcept(TestConcept) {
                this.setState({TestConceptValue: TestConcept});
                }

        radioOnChange(e){
          this.setState({displayBox:e.target.value})
        }
        // Adding a new question
                createTestQuestion(e) {
                    e.preventDefault();
                    // Getting values of the testdomain,testconcept,testquestion,testanswer,testhint from textfield
                    let TestDomain = this.state.TestDomainValue;
                    let TestConcept = this.state.TestConceptValue;
                    let TestQuestion = this.refs.TestQuestion.value;
                    let TestAnswer = this.refs.TestAnswer.value;
                    let TestHint = this.refs.TestHint.value;
                    // Temp array for storing the options of the qustion
                    let TestOptionArray=[];
                    let TestType=0;
                    // Checking the type of the testquestion ie two option or four option
                    if(TestDomain && TestConcept && TestQuestion && TestAnswer && TestHint)
                    {
                        if(this.state.displayBox==='option2')
                        {
                        let TestOption1 = this.refs.TestOption1.value;
                        let TestOption2 = this.refs.TestOption2.value;
                        TestType = 2;
                        TestOptionArray=[];
                        TestOptionArray.push(TestOption1);
                        TestOptionArray.push(TestOption2);
                        }
                      else{
                        let TestOption1 = this.refs.TestOption1.value;
                        let TestOption2 = this.refs.TestOption2.value;
                        let TestOption3 = this.refs.TestOption3.value;
                        let TestOption4 = this.refs.TestOption4.value;
                        TestType=4;
                        TestOptionArray=[];
                        TestOptionArray.push(TestOption1);
                        TestOptionArray.push(TestOption2);
                        TestOptionArray.push(TestOption3);
                        TestOptionArray.push(TestOption4);

                        }



                      //Adding new testquestion to the neo4j
                        let url = Config.url + '/assesment/createTestQuestions';
                        Axios.post(url, {
                            TestDomain: TestDomain,
                            TestConcept:TestConcept,
                            TestQuestion:TestQuestion,
                            TestType:TestType,
                            TestOptions:TestOptionArray,
                            TestAnswer:TestAnswer,
                            TestHint:TestHint
                          }).then((response) => {
                this.refs.TestQuestion.value = '';
                this.refs.TestHint.value = '';
                this.refs.TestAnswer.value = '';
                this.refs.TestOption.value = '';
                this.setState({TestDomainValue: ''});
                this.setState({TestConceptValue: ''});

                        }).catch((error) => {
                            console.log(error);
                        });
                        this.setState({opensnackbar: true, snackbarMsg: 'New TestConcept Added'});

                    } else {
                        this.setState({opensnackbar: true, snackbarMsg: 'Please fill all the concept fields'});
                    }
                }
//Adding new testquestion based on testdomain and testconcept
    render() {

          let option2 = <div> <input type="text" placeholder="option 1" ref='TestOption1' /><br /> <br/>
          <input type="text" placeholder="option 2" ref='TestOption2' /></div>
          let option4 = <div>
            <input type="text" placeholder="option 1" ref='TestOption1'/><br /> <br/>
            <input type="text" placeholder="option 2" ref='TestOption2'/><br /> <br/>
            <input type="text" placeholder="option 3" ref='TestOption3'/><br /> <br/>
            <input type="text" placeholder="option 4" ref='TestOption4'/></div>
  return (
          <div style={{
              backgroundImage: 'url(\'../../images/background.jpg\')',
              height:'auto'
          }}>

          <Grid>
            <Grid.Row >
              <Grid.Column width={1}/>
                <Grid.Column width={6}>
                    <h4>ADD NEW QUESTION</h4>
                    <Divider/>
                </Grid.Column>
            </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={1}/>
                  <Grid.Column width={6}>
                  <Form>
                            <Form.Field>
                            <TestDomainDropdown TestDomain={this.state.TestDomain}
                             handleTestDomain={this.getTestDomain}
                            value={this.state.TestDomainValue}/>


                            <TestConceptDropdown TestConcept={this.state.TestConcept}
                              handleTestConcept={this.getTestConcept}
                            value={this.state.TestConceptValue}/>

                      <br />
                      <label>
                          <h4>Question:</h4>
                      </label>
                      <input autoComplete='off' type='text' ref='TestQuestion'
                      placeholder='Type Question here...'/>
                      <br />
                        <br />


                      <form method="post" action="#">
                      <h4>select option:</h4>
                        <div>
                          <div class="field">
                            <div class="ui radio checkbox">
                              <input type="radio" class="hidden" name="radioGroup"  value='option2' onChange={this.radioOnChange.bind(this)} />
                              <label>Type 2</label>
                            </div>
                          </div>
                          <div class="field">
                            <div class="ui radio checkbox">
                              <input type="radio" class="hidden" name="radioGroup"  value='option4' onChange={this.radioOnChange.bind(this)} />
                              <label>Type 4</label>
                            </div>
                          </div>
                              {(this.state.displayBox)?(this.state.displayBox==='option2'?option2:option4):''}
                        </div>

                      </form>

                      <br />
                      <label>
                          <h4>Answer:</h4>
                      </label>
                      <input autoComplete='off' type='text' ref='TestAnswer'
                      placeholder='Type answer here...'/>
                      <br />
                        <br />
                      <label>
                          <h4>Hint:</h4>
                      </label>
                      <input autoComplete='off' type='text' ref='TestHint'
                      placeholder='Type hint here...'/>

                            </Form.Field>
                      </Form>

                  </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={1}/>
                      <Grid.Column width={6}>
                  <Button color='facebook' fluid onClick={this.createTestQuestion}>Add</Button>
                </Grid.Column>
                  </Grid.Row>

          </Grid>
          <Snackbar open={this.state.opensnackbar}
                   message={this.state.snackbarMsg}
                    onRequestClose={this.handleRequestClose}/>
            </div>
        );
    }
}
