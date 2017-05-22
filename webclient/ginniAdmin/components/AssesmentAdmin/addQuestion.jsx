import React , {Component} from 'react';
import {Form, Grid, Button, Dropdown, Input,Radio, Icon, Divider ,Checkbox} from 'semantic-ui-react';
import Config from '../../../../config/url';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import TestDomainDropdown from './TestDomainDropdown';
import TestConceptDropdown from './TestConceptDropdown';
import ReactDOM from 'react-dom';

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
        TestConcept: [],
        correctAnswer:[],
        checkedState1:false,
        checkedState2:false,
        checkedState3:false,
        checkedState4:false

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

        handleRequestClose = () => {
            this.setState({opensnackbar: false});
        }

        optionOnChange = (e, { value }) => this.setState({ displayBox:value })

        toggleOption1 = (event,data) => {
          let answer;
          let state1 = this.state.checkedState1;
          let state2 = this.state.checkedState2;
          if(data.name==='opt1checked1')
          {
            state1 = !this.state.checkedState1;
            this.setState({ checkedState1: !this.state.checkedState1 });
          }
          if(data.name==='opt1checked2')
          {
            state2 = !this.state.checkedState2;
            this.setState({ checkedState2: !this.state.checkedState2 });
          }
          if(state1 == false && state2 == false)
          {
              this.setState({correctAnswer:[]});
          }
          else
          {
              if( state1 == true || state2 == true)
              {

                let answer1=ReactDOM.findDOMNode(this.refs.TestOption1).value;
                let answer2=ReactDOM.findDOMNode(this.refs.TestOption2).value;
                answer =[];
                if(answer1 !=" " && state1 == true)
                answer.push(answer1);
                if(answer2 !=" " && state2 == true)
                answer.push(answer2);
              }
              this.setState({correctAnswer:answer});
            }
        }

        toggleOption2 = (event,data) => {
          let answer=[];
          let state1 = this.state.checkedState1;
          let state2 = this.state.checkedState2;
          let state3 = this.state.checkedState3;
          let state4 = this.state.checkedState4;
          if(data.name==='opt2checked1')
          {
            state1 = !this.state.checkedState1;
            this.setState({ checkedState1: !this.state.checkedState1 });
          }
          if(data.name==='opt2checked2')
          {
            state2 = !this.state.checkedState2;
            this.setState({ checkedState2: !this.state.checkedState2 });
          }
          if(data.name==='opt2checked3')
          {
            state3 = !this.state.checkedState3;
            this.setState({ checkedState3: !this.state.checkedState3 });
          }
          if(data.name==='opt2checked4')
          {
            state4 = !this.state.checkedState4;
            this.setState({ checkedState4: !this.state.checkedState4 });
          }
          if(state1 == false && state2 == false && state3 == false && state4 == false )
          {
              this.setState({correctAnswer:[]});
          }
          else
          {
              if( state1 == true || state2 == true || state3 == true || state4 == true)
              {

                let answer1=ReactDOM.findDOMNode(this.refs.TestOption1).value;
                let answer2=ReactDOM.findDOMNode(this.refs.TestOption2).value;
                let answer3=ReactDOM.findDOMNode(this.refs.TestOption3).value;
                let answer4=ReactDOM.findDOMNode(this.refs.TestOption4).value;

                answer =[];
                if(answer1 !=" " && state1 == true)
                answer.push(answer1);
                if(answer2 !=" " && state2 == true)
                answer.push(answer2);
                if(answer3 !=" " && state3 == true)
                  answer.push(answer3);
                if(answer4 !=" " && state4 == true)
                answer.push(answer4);

              }

              this.setState({correctAnswer:answer});
          }
        }

        handleclose = () => {
            this.setState({open: false});
        }

        // Adding a new question
                  createTestQuestion(e) {
                    e.preventDefault();
                    // Getting values of the testdomain,testconcept,testquestion,testanswer,testhint from textfield
                    let TestDomain = this.state.TestDomainValue;
                    let TestConcept = this.state.TestConceptValue;
                    let TestQuestion = this.refs.TestQuestion.value;
                    let TestAnswer = this.state.correctAnswer;
                    let TestHint = this.refs.TestHint.value;
                    // Temp array for storing the options of the qustion
                    let TestOptionArray=[];
                    let TestType="0";
                    // Checking the type of the testquestion ie two option or four option
                    if(TestDomain && TestConcept && TestQuestion && TestAnswer && TestHint)
                    {
                        if(this.state.displayBox==='option2')
                        {
                        let TestOption1 = this.refs.TestOption1.value;
                        let TestOption2 = this.refs.TestOption2.value;
                        TestType = "2";
                        TestOptionArray=[];
                        TestOptionArray.push(TestOption1);
                        TestOptionArray.push(TestOption2);
                        }
                      else{
                        let TestOption1 = this.refs.TestOption1.value;
                        let TestOption2 = this.refs.TestOption2.value;
                        let TestOption3 = this.refs.TestOption3.value;
                        let TestOption4 = this.refs.TestOption4.value;
                        TestType="4";
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
                         this.refs.TestHint.value = '';
                         this.refs.TestQuestion.value = '';
                         this.setState({TestDomainValue: ''});
                         this.setState({TestConceptValue: ''});
                         this.setState({TestConcept: []});
                         this.setState({correctAnswer: []});
                         this.setState({checkedState1: false});
                         this.setState({checkedState2: false});
                         this.setState({checkedState3: false});
                         this.setState({checkedState4: false});
                         this.setState({displayBox: ''});
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
          const options = [
              { key: 'option 2', text: '2 option Type ', value: 'option2' },
              { key: 'option 4', text: '4 option Type', value: 'option4' },
              ]

          let option2 = <div>
          <Grid>
          <Grid.Row >
            <Grid.Column width={2}/>
              <Grid.Column width={6}>
              <h4>Enter Options</h4>
              </Grid.Column>
          </Grid.Row>

          <Grid.Row>

          <Grid.Column width={2}/>
          <Grid.Column width={6}>
          <Form><Form.Field>
          <input type="text" placeholder="option 1" ref='TestOption1'/>
           <Checkbox label='Add as answer' name='opt1checked1'
           checked={this.state.checkedState1} onChange={this.toggleOption1} />
          </Form.Field></Form>
          </Grid.Column>

          <Grid.Column width={2}/>
          <Grid.Column width={6}>
          <Form><Form.Field>
          <input type="text" placeholder="option 2" ref='TestOption2'/>
          <Checkbox label='Add as answer ' name='opt1checked2'
           checked={this.state.checkedState2} onChange={this.toggleOption1} />
          </Form.Field></Form>
          </Grid.Column>

          </Grid.Row>
          </Grid>
            </div>
          let option4 = <div>
            <Grid>
            <Grid.Row >
              <Grid.Column width={1}/>
                <Grid.Column width={6}>
                <h4>Enter Options</h4>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>

            <Grid.Column width={1}/>
            <Grid.Column width={5}>
            <Form><Form.Field>
            <input type="text" placeholder="option 1" ref='TestOption1'/>
             <Checkbox label='Add as answer' name='opt2checked1'
             checked={this.state.checkedState1} onChange={this.toggleOption2} />
            </Form.Field></Form>
            </Grid.Column>

            <Grid.Column width={1}/>
            <Grid.Column width={5}>
            <Form><Form.Field>
            <input type="text" placeholder="option 2" ref='TestOption2'/>
            <Checkbox label='Add as answer ' name='opt2checked2'
             checked={this.state.checkedState2} onChange={this.toggleOption2} />
            </Form.Field></Form>
            </Grid.Column>

            </Grid.Row>

            <Grid.Row>

            <Grid.Column width={1}/>
            <Grid.Column width={5}>
            <Form><Form.Field>
            <input type="text" placeholder="option 3" ref='TestOption3'/><Checkbox label='Add as answer ' name='opt2checked3' checked={this.state.checkedState3} onChange={this.toggleOption2} />
            </Form.Field></Form>
            </Grid.Column>
            <Grid.Column width={1}/>
            <Grid.Column width={5}>
            <Form><Form.Field>
            <input type="text" placeholder="option 4" ref='TestOption4'/><Checkbox label='Add as answer ' name='opt2checked4' checked={this.state.checkedState4} onChange={this.toggleOption2} />
            </Form.Field></Form>
            </Grid.Column>

            </Grid.Row>
            </Grid>
            </div>
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
                  <Grid.Column width={8}>
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
                      <Grid.Column width={4}>
                      <form method="post" action="#">
                      <h4>select option type</h4>
                        <div>
                           <Dropdown placeholder='Select options type' fluid selection options={options} onChange={this.optionOnChange}  />
                        </div>
                      </form>
                      </Grid.Column>
                    </Grid.Row>

                       {(this.state.displayBox)?(this.state.displayBox==='option2'?option2:option4):''}

                      <Grid.Row>
                      <Grid.Column width={1}/>
                      <Grid.Column width={8}>
                      <Form>
                                <Form.Field>
                      <label>
                          <h4>Answer</h4>
                      </label>
                      <input autoComplete='off' type='text' value={this.state.correctAnswer}
                      placeholder='Type answer here...'/>
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
                    <Grid.Column width={5}/>
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
