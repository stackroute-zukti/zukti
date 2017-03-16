import React from 'react';
import {
    Divider,
    Grid
  } from 'semantic-ui-react';
import QuestionAnswer from './questionsAnswer';
import './buildAi.css';
export default class QuestionSetDisplay extends React.Component {

    constructor() {
        super();
    }
    render() {
        return (
            <div >
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
                  It is a set of questions and the corresponding bot replies.
                 I will understand user questions similar to those you’ve set up and reply
                 with a appropiate answer.
                 </p>
                  <Divider fitted/>
                        </div>
                    </Grid.Row>
                    <Grid.Row>
                    <Grid.Column width={16}>
                        <QuestionAnswer/>
                    </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        );
    }
}
