import React from 'react';
import {TextArea, Form, Button, Icon,Grid, Popup,Checkbox} from 'semantic-ui-react';
export default class TestQuestionOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          emptyInput: false
        };
        this.getInputData = this.getInputData.bind(this);
        this.getCheckBoxStatus = this.getCheckBoxStatus.bind(this);
        this.addNewOption = this.addNewOption.bind(this);
        this.removeOption = this.removeOption.bind(this);
    }
    getInputData(e, data) {
          this.setState({emptyInput: false});
        this.props.SaveOptionToParent('text', data.value, data.id);

    }
    getCheckBoxStatus(e, data) {
        this.props.SaveAnswerToParent('checkbox',data.checked, data.name, data.id);
    }
    removeOption(e, data) {
      e.preventDefault()
      let index = data.id;
      this.props.handlerRemoveOption('text',  index,data.name);
    }
    addNewOption() {
        if(this.props.options[this.props.options.length-1].trim() === '') {
        this.setState({emptyInput: true});
      }
      else{
        this.setState({emptyInput: false});
        this.props.SaveOptionToParent('text', '', this.props.options.length);
      }
    }
    render() {
      let inputs = this.props.options.map((input, index)=> {
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
                    {this.props.options.length === 1 ? '' :
                    <Button id={index} name={input} onClick={this.removeOption}
                     style={{backgroundColor: 'white', color: 'red', marginLeft: '85%'}}>
                    <Icon name='minus' circular/></Button>}
                   </Grid.Column>
              </Grid.Row>
              <Grid.Row>

                <Grid.Column width={8}>
                  <Checkbox label='Add as answer' name={input}
                    id={index} onChange={this.getCheckBoxStatus} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </div>
        );
      });
        return (
            <div>
              <Form>
                {inputs}
              </Form>

              <Grid.Row>
                <Grid.Column width={8}>
                <Popup offset={10} inverted positioning='left center'
                  trigger={<Button onClick={this.addNewOption}
                  style={{backgroundColor: 'white', color: 'blue', marginLeft: '85%'}}>
                 <Icon name='plus' circular/> </Button>}
                 content='Add' size='mini'></Popup>
                {this.state.emptyInput ? <p style = {{color: 'red'}}>
                Fill the above input field first</p> : ''}

                </Grid.Column>
              </Grid.Row>

            </div>
        );
    }
}
