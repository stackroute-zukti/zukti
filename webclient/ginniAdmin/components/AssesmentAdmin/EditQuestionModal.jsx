import React from 'react';
import {Form,Grid,Modal,TextArea,Button, Input, Icon,Checkbox,Popup} from 'semantic-ui-react';
import Config from '../../../../config/url';
import Axios from 'axios';
import Snackbar from 'material-ui/Snackbar';

export default class EditQuestionModal extends React.Component {
    constructor(props) {
      super(props);
      this.deleteTestQdetails=this.deleteTestQdetails.bind(this);
      this.SetModifiedQuestion=this.SetModifiedQuestion.bind(this);
      this.handleChangeHint=this.handleChangeHint.bind(this);
      this.handleChangeQuestion=this.handleChangeQuestion.bind(this);
      this.saveAnswerToState = this.saveAnswerToState.bind(this);
      this.getInputData = this.getInputData.bind(this);
      this.addNewOption = this.addNewOption.bind(this);
      this.removeOption = this.removeOption.bind(this);
      this.show=this.show.bind(this);
      this.close=this.close.bind(this);
      this.state = {
        TestAnswer:[],
        testhint:'',
        opensnackbar: false,
        snackbarMsg: '',
        testquestion:'',
        ttype:'',
        count:0,
        Testoptions:[],
        open: true,
        emptyInput: false,
        opendimmer:false
          };
        };

        show(dimmer)
        {this.setState({ dimmer, open: true })
         }
       close(){
         this.props.changeEdit(false)
         this.setState({ open: false })
         }
       handleRequestClose = () => {
           this.setState({opensnackbar: false});
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
          this.setState({TestAnswer:testans[0]});
          this.setState({testquestion:testque});
          this.setState({testhint:testhint});
          this.setState({Testoptions:testopt[0]});
        }).catch((error) => {
            console.log(error);
        });

}

removeOption(e, data) {
  e.preventDefault();
  this.state.Testoptions.splice(data.id, 1);
  this.setState({Testoptions: this.state.Testoptions});
    if(this.state.TestAnswer.indexOf(data.name)!=-1)
    {
    this.state.TestAnswer.splice(this.state.TestAnswer.indexOf(data.name),1);
    this.setState({TestAnswer:this.state.TestAnswer});
    }

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
              // Getting values of the testdomain,testconcept,testquestion,testanswer,testhint from textfield
              let testopt=this.state.Testoptions;
              let testanswer=this.state.TestAnswer;
              let TestQuestion = this.props.question;
              let testhint=this.state.testhint;
              let testquestion=this.state.testquestion;
              let MAQ=false;
              if(testanswer.length>1)
              {
                 MAQ=true;
              }
              // Checking the type of the testquestion ie two option or four option
              if((testquestion||TestQuestion) && testhint)
              {
                if(testopt.length>1)
                {
                  if(testopt.indexOf("")===-1){
                    if(testanswer.length>=1){

              let url = Config.url + '/assesment/setTestQdetails';
                  Axios.post(url, {
                      TestQuestion:TestQuestion,
                      testanswer:testanswer,
                      testhint:testhint,
                      testquestion:testquestion,
                      testoptions:testopt,
                      MAQ:MAQ
                  }).then((response) => {
                    this.close();
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

          handleChangeAnswer(e) {
            this.setState({TestAnswer:e.target.value});
          }
         handleChangeQuestion(e) {
           this.setState({testquestion:e.target.value});
          }
         handleChangeHint(e) {
            this.setState({testhint:e.target.value});
          }

          getInputData(e, data) {
            e.preventDefault();
                this.setState({emptyInput: false});
                this.state.Testoptions[data.id] = data.value;
                this.setState({Testoptions: this.state.Testoptions});
          }


          saveAnswerToState(e,data) {
            e.preventDefault();
            if(this.state.count===0)
              {
              this.state.TestAnswer=[] ;
              this.setState({TestAnswer:[]});
              this.setState({count:1});
            }

            if(data.checked){
              this.state.TestAnswer.push(data.name) ;
              this.setState({TestAnswer: this.state.TestAnswer});
            }
            else if(this.state.TestAnswer.indexOf(data.name)!=-1){
            this.state.TestAnswer.splice(this.state.TestAnswer.indexOf(data.name),1);
            this.setState({TestAnswer: this.state.TestAnswer});
            }
          }


          addNewOption(e,data) {
            e.preventDefault()

              if(this.state.Testoptions[this.state.Testoptions.length-1].trim() === '') {
              this.setState({emptyInput: true});
            }
            else{
              this.setState({emptyInput: false});
              this.state.Testoptions[this.state.Testoptions.length] = " ";
              this.setState({Testoptions: this.state.Testoptions});
              // this.props.SaveAnswerToParent('checkbox', '', this.props.options.length);

            }

}
//Adding new testquestion based on testdomain and testconcept
    render() {
      let inputs = this.state.Testoptions.map((input, index)=> {
        if(index!==0){

                  return (
                    <div>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={13}>
                              <TextArea value={input}
                                id={index} onChange={this.getInputData}
                                placeholder='Type option here...' autoHeight />
                              </Grid.Column>
                              <Grid.Column width={1}>
                              {this.state.Testoptions.length === 1 ? '' :
                              <Button id={index} name={input} onClick={this.removeOption}
                               style={{backgroundColor: 'white', color: 'red', marginLeft: '85%'}}>
                              <Icon name='minus' circular/></Button>}
                             </Grid.Column>
                        </Grid.Row>
                            <Checkbox label='Add as answer' name={input}
                              id={index} onChange={this.saveAnswerToState} />
                      </Grid>
                    </div>
                  );
                  }
      });
      const { open, dimmer } = this.state
      return (
          <div style={{
              backgroundImage: 'url(\'../../images/background.jpg\')',
              height:'auto'
          }}>

          <Modal dimmer={dimmer} open={open} closeIcon='close' onClose={this.close}>
          <Modal.Header>Edit Test-Question</Modal.Header>
          <Modal.Content>
          <Form>
          <Form.Field>
          <label>
                <h4>Question</h4>
            </label>
            <input autoComplete='off' type='text'
             value={this.state.testquestion}
             onChange={this.handleChangeQuestion}
            placeholder='Type question here...'/><br/><br/>
              <Grid.Row>
                 <Grid.Column width={1}/>
                 <Grid.Column width={7}>
                 <label>
                       <h4>Options</h4>
                   </label>
                   <Form>

                   <TextArea autoComplete='off' type='text'
                    value={this.state.Testoptions[0]} id={0}
                    onChange={this.getInputData}    style={{width: '80%'}}
                   placeholder='Type option here...' autoHeight/><br/> <br/>
                   <Checkbox label='Add as answer' name={this.state.Testoptions[0]}
                     id={0} onChange={this.saveAnswerToState} /><br/> <br/>
                      </Form>
                         <div>
                           <Form>
                             {inputs}
                           </Form>
                           <Popup offset={10} inverted positioning='left center'
                             trigger={<Button onClick={this.addNewOption} icon
                               style={{backgroundColor: 'white', color: 'blue', marginLeft: '85%'}}>
                               <Icon name='plus' circular/></Button>} content='Add' size='mini'></Popup>
                           {this.state.emptyInput ? <p style = {{color: 'red'}}>Fill the above input field first</p> : ''}
                         </div>

               </Grid.Column>
             </Grid.Row>
              <label>
                  <h4>Answer</h4>
              </label>
              <Input error disable autoComplete='off' type='text'
              value={this.state.TestAnswer} style={{color: 'blue'}}
              placeholder='Select from checkbox...'/>
              <br />
                <br />
        <label>

            <h4>Hint</h4>
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
          <Snackbar open={this.state.opensnackbar}
                   message={this.state.snackbarMsg}
                    onRequestClose={this.handleRequestClose}/>
        </Modal>

          </div>
        );
    }
  }
