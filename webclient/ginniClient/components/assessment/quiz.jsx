import React, {PropTypes} from 'react';
import QuestionList from './questionList';
import {
    Card,
    Container,
    Radio,
    Button,
    Label,
    Form,
    Segment,
    TextArea
} from 'semantic-ui-react'
const Quiz = ({
    step,
    questions,
    totalQuestions,
    score,
    handleAnswerClick,
    format,
    flag,
    settimer
}) => {
    return (
        <div className="wrapper">
            <Card fluid>
                <Card.Content>
                    <Card.Header>
                        <Segment id="leftbar">

                            <div className='timeheader'>

                                <span className="time">
                                    <strong>{format}</strong>
                                </span>
                            </div>

                            {/* <Button onClick={settimer}>Start test</Button> */}
                            <div className="reacthead">

                                <strong>React</strong>
                            </div><br/><br/>

                        </Segment>
                    </Card.Header>
                    <Card.Description>
                        <QuestionList questions={questions} handleAnswerClick={handleAnswerClick}/>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>

                        <Label color='blue'>Question {step}
                            of {totalQuestions}</Label>
                        {flag == 'assessment'
                            ? <Label color='teal'>Current Score = {score}</Label>
                            : ''}

                    </div>
                    <div className="correct-modal">
                        <div className="praise">Correct!</div>
                        <div className="bonus"></div>
                    </div>
                </Card.Content>

            </Card>
        </div>
    );
}

Quiz.propTypes = {
    step: PropTypes.number.isRequired,
    questions: PropTypes.array.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    handleAnswerClick: PropTypes.func.isRequired
};

export default Quiz;
