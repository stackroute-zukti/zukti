import React , {Component} from 'react';
import {Form, Grid, Button, Dropdown, Input, Divider,Checkbox} from 'semantic-ui-react';
import Config from '../../../../config/url';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import TestDomainDropdown from './TestDomainDropdown';
import TestConceptDropdown from './TestConceptDropdown';
import TestQuestionOption from './TestQuestionOption'

export default class AddQuestion extends React.Component {
    constructor(props) {
      super(props);
      this.getCheckBoxStatus=this.getCheckBoxStatus.bind(this);
      this.saveOptionToState = this.saveOptionToState.bind(this);
      this.saveAnswerToState = this.saveAnswerToState.bind(this);
      this.removeOption = this.removeOption.bind(this);

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
        TestConcept: [],
        Testoptions:[''],
        TestAnswer:[]
      };
        };
        //to get TestDomain Dropdown
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
        // remove option textbox and values
        removeOption(type, index,name) {
            this.state.Testoptions.splice(index, 1);
            this.setState({Testoptions: this.state.Testoptions});

            if(this.state.TestAnswer.indexOf(name)!=-1){
              this.state.TestAnswer.splice(this.state.TestAnswer.indexOf(name),1);
              this.setState({TestAnswer:this.state.TestAnswer});

            }
          }
          getCheckBoxStatus(e,data) {
            let option1=this.refs.Option1.value;
            if(data.checked){
              this.state.TestAnswer.push(option1);
              this.setState({TestAnswer: this.state.TestAnswer});
            }
            else if(this.state.TestAnswer.indexOf(option1)!=-1){
              this.state.TestAnswer.splice(this.state.TestAnswer.indexOf(option1),1);
              this.setState({TestAnswer: this.state.TestAnswer});
            }
          }
        //save options to  Testoptions as Array
        saveOptionToState(type, Option, i) {
                this.state.Testoptions[i] = Option;
                this.setState({Testoptions: this.state.Testoptions});
        }
        //save answers to  TestAnswer as Array
        saveAnswerToState(type,checked, Answer, i) {
          if(checked){
            this.state.TestAnswer.push(Answer) ;
            this.setState({TestAnswer: this.state.TestAnswer});
          }
          else if(this.state.TestAnswer.indexOf(Answer)!=-1){
            this.state.TestAnswer.splice(this.state.TestAnswer.indexOf(Answer),1);
            this.setState({TestAnswer: this.state.TestAnswer});
          }
        }
        // to get TestConcept Dropdown
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
        handleRequestClose = () => {
            this.setState({opensnackbar: false});
        }
        handleclose = () => {
            this.setState({open: false});
        }

        // Adding a new question
      createTestQuestion(e) {
        e.preventDefault();
        // Getting values of the testdomain,testconcept,testquestion,testanswer,testhint from textfield
        let option1=this.refs.Option1.value;
        this.state.Testoptions.push(option1);
        let TestDomain = this.state.TestDomainValue;
        let TestConcept = this.state.TestConceptValue;
        let TestQuestion = this.refs.TestQuestion.value;
        let TestHint = this.refs.TestHint.value;
        let TestAnswer = this.state.TestAnswer;
        let Testoptions=this.state.Testoptions;
        let MAQ=false;
        if(TestAnswer.length>1)
        {
           MAQ=true;
        }
        // Checking the type of the testquestion ie two option or four option
        if(TestDomain&& TestConcept && TestQuestion && TestHint)
        {
          if(Testoptions.length>1)
          {
            if(Testoptions.indexOf("")===-1){
              if(TestAnswer.length>=1){

          //Adding new testquestion to the neo4j
            let url = Config.url + '/assesment/createTestQuestions';
            Axios.post(url, {
                TestDomain: TestDomain,
                TestConcept:TestConcept,
                TestQuestion:TestQuestion,
                MAQ:MAQ,
                Testoptions:Testoptions,
                TestAnswer:TestAnswer,
                TestHint:TestHint
              }).then((response) => {
            this.refs.TestHint.value = '';
            this.refs.Option1.value = '';
             this.refs.TestQuestion.value = '';
             this.setState({TestDomainValue: ''});
             this.setState({TestConceptValue: ''});
             this.setState({TestConcept: []});
             this.setState({Testoptions: ['']});
             this.setState({TestAnswer: ['']});
            }).catch((error) => {
                console.log(error);
            });
            this.setState({opensnackbar: true, snackbarMsg: 'New TestConcept Added'});
          }
          else{
            this.setState({opensnackbar: true, snackbarMsg: 'Please fill Answer value'});
          }
        }

          else{
            this.setState({opensnackbar: true, snackbarMsg: 'Please fill option value'});
          }
        }
          else{
            this.setState({opensnackbar: true, snackbarMsg: 'Please add one more option'});
          }
        }
        else {
            this.setState({opensnackbar: true, snackbarMsg: 'Please fill all the concept fields'});
        }
      }
      //Adding new testquestion based on testdomain and testconcept
          render() {
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
                        <Grid.Column width={4}>
                        <Form>
                                  <Form.Field>
                                  <TestDomainDropdown TestDomain={this.state.TestDomain}
                                   handleTestDomain={this.getTestDomain}
                                  value={this.state.TestDomainValue}/>
                              </Form.Field>
                        </Form>
                        </Grid.Column>
                        <Grid.Column width={1}/>
                        <Grid.Column width={4}>
                        <Form>
                                  <Form.Field>
                                  <TestConceptDropdown TestConcept={this.state.TestConcept}
                                    handleTestConcept={this.getTestConcept}
                                  value={this.state.TestConceptValue}/>
                            </Form.Field>
                      </Form>
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                        <Grid.Column width={1}/>
                        <Grid.Column width={9}>
                        <Form>
                                  <Form.Field>
                            <label>
                                <h4>Question</h4>
                            </label>
                            <input autoComplete='off' type='text' ref='TestQuestion'
                            placeholder='Type Question here...'/>
                            </Form.Field>
                            </Form>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={1}/>
                          <Grid.Column width={9}>
                          <Form>
                          <Form.Field>
                        <label>
                          <h4 align="left">Enter Options</h4>
                         </label>
                         <input autoComplete='off' type='text' ref='Option1'
                         placeholder='Type Option here...'/><br/>
                         <Checkbox label='Add as answer' onChange={this.getCheckBoxStatus} />
                         </Form.Field>
                         </Form>
                       </Grid.Column>
                       </Grid.Row>
                       <Grid.Row>
                          <Grid.Column width={1}/>
                          <Grid.Column width={11}>
                          <TestQuestionOption options={this.state.Testoptions}
                          handlerRemoveOption={this.removeOption}
                          SaveOptionToParent ={this.saveOptionToState}
                          SaveAnswerToParent ={this.saveAnswerToState}
                          />
                        </Grid.Column>
                      </Grid.Row>

                          <Grid.Row>
                            <Grid.Column width={1}/>
                            <Grid.Column width={9}>
                            <Form>
                                      <Form.Field>
                            <label>
                            <h4>Answer</h4>
                            </label>
                            <input error autoComplete='off' type='text' value={this.state.TestAnswer}
                            placeholder='Select from checkbox'/>
                            <label>
                                <h4>Hint</h4>
                            </label>
                            <input autoComplete='off' type='text' ref='TestHint'
                            placeholder='Type hint here...'/>
                                  </Form.Field>
                            </Form>
                        </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                          <Grid.Column width={6}/>
                            <Grid.Column width={4}>
                        <Button color='green' fluid onClick={this.createTestQuestion}>Add</Button>
                      </Grid.Column>
                        </Grid.Row>
                        <Grid.Column width={8}/>
                </Grid>
                <Snackbar open={this.state.opensnackbar}
                         message={this.state.snackbarMsg}
                          onRequestClose={this.handleRequestClose}/>
                  </div>
              );
          }
      }
