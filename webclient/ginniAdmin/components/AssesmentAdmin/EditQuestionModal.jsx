import React from 'react';
import {Form, Grid,Modal, Button, Dropdown, Input, Icon,Checkbox, Divider} from 'semantic-ui-react';
import Config from '../../../../config/url';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';

export default class EditQuestionModal extends React.Component {
    constructor(props) {
      super(props);
      this.deleteTestQdetails=this.deleteTestQdetails.bind(this);
      this.SetModifiedQuestion=this.SetModifiedQuestion.bind(this);
      this.handleChangeOption1=this.handleChangeOption1.bind(this);
      this.handleChangeOption2=this.handleChangeOption2.bind(this);
      this.handleChangeOption3=this.handleChangeOption3.bind(this);
      this.handleChangeOption4=this.handleChangeOption4.bind(this);
      this.handleChangeAnswer=this.handleChangeAnswer.bind(this);
      this.handleChangeHint=this.handleChangeHint.bind(this);
      this.handleChangeQuestion=this.handleChangeQuestion.bind(this);

      this.show=this.show.bind(this);
      this.close=this.close.bind(this);
      this.state = {
        testanswer:[],
        testhint:'',
        testquestion:'',
        ttype:'',
        testoption1:'',
        testoption2:'',
        testoption3:'',
        testoption4:'',
        open: true,
        opendimmer:false,
        checkedState1:false,
        checkedState2:false,
        checkedState3:false,
        checkedState4:false
            };
        };

        show(dimmer)
        {this.setState({ dimmer, open: true })
      }
       close(){
         this.props.changeEdit(false)
         this.setState({ open: false })
       }

componentDidMount(){
  // Getting values of the testdomain,testconcept,testquestion,testanswer,testhint from textfield
    let TestDomain = this.props.domain;
    let TestConcept = this.props.concept;
    let TestQuestion = this.props.question;
    let url = Config.url + '/assesment/getTestQdetails';
        Axios.post(url, {
            TestDomain: TestDomain,
            TestConcept:TestConcept,
            TestQuestion:TestQuestion
        }).then((response) => {
          let testque = response.data._fields[0];
          let testans = response.data._fields[1];
          let testhint = response.data._fields[2];
          let testopt = response.data._fields[3];
          let ttype = response.data._fields[4];
          this.setState({testanswer:testans});
          this.setState({testquestion:testque});
          this.setState({testhint:testhint});
          this.setState({testoption1:testopt[0][0]});
          this.setState({testoption2:testopt[0][1]});
          this.setState({testoption3:testopt[0][2]});
          this.setState({testoption4:testopt[0][3]});
          this.setState({ttype:ttype[0]});
        }).catch((error) => {
            console.log(error);
        });

}





deleteTestQdetails(e){
    let TestQuestion = this.props.question;
    let url = Config.url + '/assesment/deleteTestQdetails';
        Axios.post(url, {
            TestQuestion:TestQuestion
        }).then((response) => {
          this.close();
        }).catch((error) => {
            console.log(error);
        });

}
    SetModifiedQuestion(e) {
              e.preventDefault();
              if(this.state.ttype==="4"){
              let testopt1 = this.state.testoption1;
              let testopt2 = this.state.testoption2;
              let testopt3 = this.state.testoption3;
              let testopt4 = this.state.testoption4;
               var TestOptionArray=[];
              TestOptionArray.push(testopt1);
              TestOptionArray.push(testopt2);
              TestOptionArray.push(testopt3);
              TestOptionArray.push(testopt4);
            }
            else {
              let testopt1 = this.state.testoption1;
              let testopt2 = this.state.testoption2;
               var TestOptionArray=[];
              TestOptionArray.push(testopt1);
              TestOptionArray.push(testopt2);
              }

              // Getting values of the testdomain,testconcept,testquestion,testanswer,testhint from textfield
              let testanswer=this.state.testanswer;
              let TestQuestion = this.props.question;
              let testhint=this.state.testhint;
              let testquestion=this.state.testquestion;
              let url = Config.url + '/assesment/setTestQdetails';
                  Axios.post(url, {
                      TestQuestion:TestQuestion,
                      testanswer:testanswer,
                      testhint:testhint,
                      testquestion:testquestion,
                      testoptions:TestOptionArray
                  }).then((response) => {
                    this.close();
                }).catch((error) => {
                      console.log(error);
                  });
                  this.setState({opensnackbar: true, snackbarMsg: 'New TestConcept Added'});
              }

          handleChangeAnswer(e) {
            this.setState({testanswer:e.target.value});
          }
         handleChangeQuestion(e) {
           this.setState({testquestion:e.target.value});
          }
         handleChangeHint(e) {
            this.setState({testhint:e.target.value});
          }
        handleChangeOption1(e) {
           this.setState({testoption1:e.target.value});
         }

       handleChangeOption2(e) {
          this.setState({testoption2:e.target.value});
        }

      handleChangeOption3(e) {
         this.setState({testoption3:e.target.value});
       }

       handleChangeOption4(e) {
          this.setState({testoption4:e.target.value});
        }


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
              this.setState({testanswer:[]});
          }
          else
          {

              if( state1 == true || state2 == true)
              {

                let answer1=this.state.testoption1;
                let answer2=this.state.testoption2;
                answer =[];
                if(answer1 !=" " && state1 == true)
                answer.push(answer1);
                if(answer2 !=" " && state2 == true)
                answer.push(answer2);
              }
              this.setState({testanswer:answer});
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
              this.setState({testanswer:[]});
          }
          else
          {
              if( state1 == true || state2 == true || state3 == true || state4 == true)
              {
                let answer1=this.state.testoption1;
                let answer2=this.state.testoption2;
                let answer3=this.state.testoption3;
                let answer4=this.state.testoption4;

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

              this.setState({testanswer:answer});
          }
        }



//Adding new testquestion based on testdomain and testconcept
    render() {
      const { open, dimmer } = this.state

      let option2 = <div>
        <h4>Enter Options</h4>
        <input type="text" placeholder="option 1" value={this.state.testoption1} onChange={this.handleChangeOption1}/>
        <Checkbox label='Add as answer' name='opt1checked1' checked={this.state.checkedState1} onChange={this.toggleOption1} /><br /> <br/>
       <input type="text" placeholder="option 2" value={this.state.testoption2} onChange={this.handleChangeOption2} />
       <Checkbox label='Add as answer ' name='opt1checked2' checked={this.state.checkedState2} onChange={this.toggleOption1} /></div>
      let option4 = <div>
        <h4>Enter Options</h4>
        <input type="text" placeholder="option 1" value={this.state.testoption1} onChange={this.handleChangeOption1}/>
        <Checkbox label='Add as answer' name='opt2checked1' checked={this.state.checkedState1} onChange={this.toggleOption2} />
        <input type="text" placeholder="option 2" value={this.state.testoption2} onChange={this.handleChangeOption2}/>
        <Checkbox label='Add as answer ' name='opt2checked2' checked={this.state.checkedState2} onChange={this.toggleOption2} />
        <input type="text" placeholder="option 3" value={this.state.testoption3} onChange={this.handleChangeOption3}/>
        <Checkbox label='Add as answer ' name='opt2checked3' checked={this.state.checkedState3} onChange={this.toggleOption2} />
        <input type="text" placeholder="option 4" value={this.state.testoption4} onChange={this.handleChangeOption4}/>
        <Checkbox label='Add as answer ' name='opt2checked4' checked={this.state.checkedState4} onChange={this.toggleOption2} /></div>

  return (
          <div style={{
              backgroundImage: 'url(\'../../images/background.jpg\')',
              height:'auto'
          }}>

          <Modal dimmer={dimmer} open={open} onClose={this.close}>
          <Icon name='remove circle' color='teal' onClick={this.close}/>
          <Modal.Header>Choose Test-Question</Modal.Header>
          <Modal.Content>
          <Form>
          <Form.Field>
          <label>
                <h4>Question</h4>
            </label>
            <input autoComplete='off' type='text'
             value={this.state.testquestion}
             onChange={this.handleChangeQuestion}
            placeholder='Type question here...'/>
              <br />
              {(this.state.ttype==="2")?option2:option4}
              <label>
                  <h4>Answer</h4>
              </label>
              <input error disable autoComplete='off' type='text'
              value={this.state.testanswer}
              placeholder='Type answer here...'/>
              <br />
                <br />
        <label>

            <h4>hint</h4>
        </label>
        <input autoComplete='off' type='text'
         value={this.state.testhint}
         onChange={this.handleChangeHint}
        placeholder='Type hint here...'/>
        </Form.Field>
              </Form>
          </Modal.Content>
          <Modal.Actions>
          <Button positive icon='checkmark' labelPosition='right' content="Submit"
             onClick={this.SetModifiedQuestion}/>
         <Button positive icon='window close' labelPosition='right' content="Delete"
                onClick={this.deleteTestQdetails}/>
          </Modal.Actions>
        </Modal>

          </div>
        );
    }
}
