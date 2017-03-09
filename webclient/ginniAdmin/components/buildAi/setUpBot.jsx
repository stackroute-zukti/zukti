import React from 'react';
import {
    Divider,
    Grid
  } from 'semantic-ui-react';
import './buildAi.css';
import AddQuestionAnswerSet from './addQuestionAnswerSet';
import DisplayQAset from '../getquestionanswerset/displayqaset';
import BuildAI from './buildAI';
import Pagination from '../getquestionanswerset/pagination';
import SetUp from '../../../Multi_Lingual/Wordings.json';
export default class QuestionSetDisplay extends React.Component {
    constructor() {
        super();
        this.state = {
          type: '',
          data: [],
          displayQuestionAnswer: []
        };
            this.addQuestionAnswerSet = this.addQuestionAnswerSet.bind(this);
            this.displayQuestionAnswerSet = this.displayQuestionAnswerSet.bind(this);
        }

  //  function to add a Question answer set to display
    addQuestionAnswerSet() {
        this.setState({type: 'add'});
      }
// function display question and answer
      displayQuestionAnswerSet(data) {
        this.setState({type: 'display'});
        this.setState({displayQuestionAnswer: <Pagination data={data}/>});
            }

    render() {
        return (
            <div id="backgroundimage" style={{
                backgroundImage: "url('../../images/background.jpg')",height: '100%'
             }}>
                <Grid style={{
                    width: '95%',
                    margin: 'auto'
                }}>
                    <Grid.Row columns={1} />
                    <Grid.Row columns={1}>
                        <div style={{
                            width: '100%'
                        }}>
                            <p id="textpara">
                              {SetUp.SetUp.Heading}</p>
                            <Divider fitted/>
                        </div>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={8}>
                        <AddQuestionAnswerSet handlerAddQASet={this.addQuestionAnswerSet}/>
                        </Grid.Column>

                    <Grid.Column width={8}>
                        <DisplayQAset handlerdisplayQASet = {this.displayQuestionAnswerSet}/>
                    </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                 {(this.state.type === 'add') ? (<BuildAI />) : (this.state.displayQuestionAnswer)}
                   </Grid.Row>
                </Grid>
            </div>
        );
    }
}
