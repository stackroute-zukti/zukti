import React from 'react';
import {Form, Grid,Modal, Button, Dropdown,Divider,Label} from 'semantic-ui-react';
import Config from '../../../../config/url';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import TestDomainDropdown from './TestDomainDropdown';
import TestConceptDropdown from './TestConceptDropdown';
import TestQuestionDropdown from './TestQuestionDropdown';
import EditQuestionModal from './EditQuestionModal';

export default class EditTestQuestion extends React.Component {
    constructor(props) {
      super(props);
      this.getTestAnswerfun = this.getTestAnswerfun.bind(this);
      this.getTestDomain = this.getTestDomain.bind(this);
      this.getTestConcept = this.getTestConcept.bind(this);
      this.getTestQuestion = this.getTestQuestion.bind(this);
      this.getTestConceptDropdown=this.getTestConceptDropdown.bind(this);
      this.getTestQuestionDropdown=this.getTestQuestionDropdown.bind(this);
      this.changeEdit=this.changeEdit.bind(this);
      this.state = {
        opensnackbar: false,
        snackbarMsg: '',
        display:false,
        TestDomainValue: '',
        TestConceptValue: '',
        TestQuestionValue: '',
        TestDomain: [],
        TestConcept: [],
        TestQuestion:[],
        editmodal:false,
        length:0
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


        getTestQuestionDropdown(TestConcept) {
             let url = Config.url + '/assesment/getTestQuestion';
             let Tdomain = this.state.TestDomainValue;
             let TestConceptvalue = TestConcept;
             Axios.post(url ,{
              TestDomainvalue: Tdomain,
              TestConceptvalue: TestConceptvalue

            }).then((response) => {
                      let TestQuestion = response.data._fields[0];

                      this.setState({length:TestQuestion.length})
                      this.setState({display:true})
                      TestQuestion.forEach((TestQuestion) => {
                           this.state.TestQuestion.push({text: TestQuestion, value: TestQuestion});
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
                this.getTestQuestionDropdown(TestConcept);
                this.setState({TestQuestion:[]});
                }
      getTestQuestion(TestQuestion) {
              this.setState({TestQuestionValue: TestQuestion});
              }


        getTestAnswerfun(e) {
        if(this.state.TestDomainValue && this.state.TestConceptValue && this.state.TestQuestionValue){
        this.setState({editmodal:true});
        }else{
        this.setState({opensnackbar: true, snackbarMsg: 'Fill all the fields'});
        }
        this.setState({display:false})
        this.setState({TestDomainValue: ''});
        this.setState({TestConcept:[]});
        this.setState({TestQuestion:[]});
            }
      changeEdit(data){
        this.setState({editmodal:data})
      }

      handleclose = () => {
          this.setState({open: false});
      }
//Adding new testquestion based on testdomain and testconcept
    render() {
  return (
          <div style={{
              backgroundImage: 'url(\'../../images/background.jpg\')',
              height:'100%'
          }}>

          <Grid>
            <Grid.Row >
              <Grid.Column width={1}/>
                <Grid.Column width={6}>
                    <h4>Edit Test Question</h4>
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
                            </Form.Field>
                          </Form>
                          </Grid.Column>

                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column width={1}/>
                          <Grid.Column width={6}>
                          <Form>
                                    <Form.Field>
                            <TestQuestionDropdown TestQuestion={this.state.TestQuestion}
                              handleTestQuestion={this.getTestQuestion}
                            value={this.state.TestQuestionValue}/>
                            </Form.Field>
                          </Form>
                            </Grid.Column>
                            <Grid.Column width={2}>
 <br/> <br/>
                            {this.state.display?<div><Label as='a'  color='teal' tag>
                              Questions in {this.state.TestConceptValue}:{this.state.length}</Label>                                  </div>:null}
                                   </Grid.Column>

                  </Grid.Row>

                  <Grid.Row>
                    <Grid.Column width={1}/>
                      <Grid.Column width={6}>

                      <Button color='facebook' fluid onClick={this.getTestAnswerfun}>EDIT</Button>
                </Grid.Column>
                  </Grid.Row>
          </Grid>

          {this.state.editmodal
      ?<EditQuestionModal
      changeEdit={this.changeEdit}
      edit={this.state.editmodal}
      domain={this.state.TestDomainValue}
      concept={this.state.TestConceptValue}
      question={this.state.TestQuestionValue}
      />:null}

      <Snackbar open={this.state.opensnackbar}
               message={this.state.snackbarMsg}
                onRequestClose={this.handleRequestClose}/>

            </div>
        );
    }
}
