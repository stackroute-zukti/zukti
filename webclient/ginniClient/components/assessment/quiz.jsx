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
    checkedValue,
    nextStep,
    handleAnswerClick,
    format,
    flag,
    settimer
}) => {
    return (
        <Container>
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
                        <QuestionList step={step} checkedValue={checkedValue} questions={questions} handleAnswerClick={handleAnswerClick}/>
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='labelheeader'>
                        <Label color='blue'>Question {step}
                            of {totalQuestions}</Label>
                        {flag == 'assessment'
                            ? <Label color='teal'>Current Score = {score}</Label>
                            : null}
                        {questions.length === 1
                            ? <Label color='blue' className="next-label" onClick={nextStep}>End Test</Label>
                            : <Label color='blue' className="next-label" onClick={nextStep}>Next</Label>}
                    </div>
                </Card.Content>

            </Card>
        </Container>
    );
}

Quiz.propTypes = {
    step: PropTypes.number.isRequired,
    questions: PropTypes.array.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    handleAnswerClick: PropTypes.func.isRequired,
    nextStep: PropTypes.func.isRequired
};

export default Quiz;
