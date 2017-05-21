import React from 'react';
import {Form, Grid, Button, Dropdown, Input, Divider} from 'semantic-ui-react';
import Config from '../../../../config/url';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';
import TestDomainDropdown from './TestDomainDropdown';

export default class AddDomain extends React.Component {
    constructor(props) {
        super(props);
        this.getTestDomain = this.getTestDomain.bind(this);
        this.getTestDomainDropdown = this.getTestDomainDropdown.bind(this);
        this.createNewTestConcept = this.createNewTestConcept.bind(this);
        this.createNewTestDomain = this.createNewTestDomain.bind(this);
        this.state = {
          TestDomainValue: '',
          opensnackbar: false,
          snackbarMsg: '',
          TestDomain: []
          };
    }
// Retriving the testconcepts and testdomains from neo4j
    componentDidMount() {
        this.getTestDomainDropdown();
    }

    getTestDomainDropdown(){
    let url = Config.url + '/assesment/getTestDomain';
    Axios.get(url).then((response) => {
      this.setState({TestDomain: []});
        let TestDomain = response.data._fields[0];
        TestDomain.forEach((TestDomain) => {
            this.state.TestDomain.push({text: TestDomain, value: TestDomain});
        });
    }).catch((error) => {
        console.log(error);
    });
  }

    handleopen = () => {
        this.setState({open: true});
    }
    handleclose = () => {
        this.setState({open: false});
    }
    handleRequestClose = () => {
        this.setState({opensnackbar: false});
    }

    getTestDomain(TestDomain) {
             this.setState({TestDomainValue: TestDomain});
        }

//Adding new testdomain to the neo4j
    createNewTestDomain(e) {
        e.preventDefault();
        let newTestDomain = this.refs.newTestDomain.value;
        if (newTestDomain) {
            let url = Config.url + '/assesment/createTestDomain';
            Axios.post(url, {
                newTestDomain: newTestDomain,
              }).then((response) => {
                this.getTestDomainDropdown();
                this.refs.newTestDomain.value = '';
                this.setState({domainValue: ''});
                this.setState({opensnackbar: true, snackbarMsg: 'New Test-Domain Added'});

            }).catch((error) => {
                console.log(error);
            });
        } else {
            this.setState({opensnackbar: true, snackbarMsg: 'Please Test-Domain Name'});
        }
    }

// Creating new testconcept under a testdomain and adding it to neo4j
    createNewTestConcept(e) {
        e.preventDefault();
//Getting values of testconcept and testdomain from textfield
        let TestConcept = this.refs.newTestConceptText.value;
        let TestDomain = this.state.TestDomainValue;

        if (TestConcept&&TestDomain) {
          // Adding the new testconcept to the neo4j
            let url = Config.url + '/assesment/createTestConcept';
            Axios.post(url, {
                TestDomain: TestDomain,
                TestConcept:TestConcept

              }).then((response) => {
                console.log(response);
                this.refs.newTestConceptText.value = '';
                this.setState({TestDomainValue: ''});
                this.setState({opensnackbar: true, snackbarMsg: 'New TestConcept Added'});

            }).catch((error) => {
                console.log(error);
            });
        } else {
            this.setState({opensnackbar: true, snackbarMsg: 'Please fill Test-Concept fields'});
        }
    }
// Adding new testdomain and testconcept
    render() {
        return (
          <div style={{
              backgroundImage: 'url(\'../../images/background.jpg\')',
              height: 'auto'
          }}>

          <Grid>
                  <Grid.Row >
                  <Grid.Column width={1}/>
                      <Grid.Column width={6}>
                          <h4>ADD NEW TEST DOMAIN</h4>
                          <Divider/>
                      </Grid.Column>
                  </Grid.Row>

                  <Grid.Row>
                      <Grid.Column width={1}/>
                      <Grid.Column width={6}>

                                   <Form>
                                         <Form.Field>
                                   <label>
                                       <h4 align="left">New Test Domain Name</h4>
                                   </label>
                                   <input autoComplete='off' type='text' ref='newTestDomain'
                                   placeholder='Type Test-Domain Name'/>
                                         </Form.Field>
                                   </Form>

                               </Grid.Column>
                    </Grid.Row>


                  <br/>
                  <Grid.Row>
                      <Grid.Column width={1}/>
                        <Grid.Column width={6}>
                  <Button color='green' fluid onClick={this.createNewTestDomain}>Add Test Domain</Button>
                 </Grid.Column>
                  </Grid.Row>
                  <br/>

                  <Divider/>

                  <Grid.Row >
                      <Grid.Column width={1}/>
                      <Grid.Column width={6}>
                          <h4>ADD NEW TEST CONCEPT</h4>
                          <Divider/>
                      </Grid.Column>

                  </Grid.Row>

                  <Grid.Row>
                      <Grid.Column width={1}/>
                      <Grid.Column width={6}>
                  <TestDomainDropdown TestDomain={this.state.TestDomain}
                   handleTestDomain={this.getTestDomain}
                  value={this.state.TestDomainValue}/>
                  <Form>
                        <Form.Field>
                  <label>
                      <h4>New Test Concept Name</h4>
                  </label>
                  <input autoComplete='off' type='text' ref='newTestConceptText'
                  placeholder='Type Test-Concept Name'/>
                        </Form.Field>
                  </Form>

                      </Grid.Column>
                  </Grid.Row>


                  <Grid.Row>
                      <Grid.Column width={1}/>
                        <Grid.Column width={6}>
                  <Button color='green' fluid onClick={this.createNewTestConcept}>Add Test Concept</Button>
                </Grid.Column>
                  </Grid.Row>
                  <Grid.Column width={6}/>
                  <Grid.Column width={6}/>
                  <Grid.Column width={6}/>
          </Grid>
          <Snackbar open={this.state.opensnackbar}
                   message={this.state.snackbarMsg}
                    onRequestClose={this.handleRequestClose}/>
            </div>
        );
    }
}
