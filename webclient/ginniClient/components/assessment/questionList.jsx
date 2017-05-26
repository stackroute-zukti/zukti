import React, {PropTypes} from 'react';
import Question from './question';
import {Container} from 'semantic-ui-react'

const QuestionList = ({step, checkedValue, questions, handleAnswerClick}) => {
    return (
        <Container fluid>
            {questions.map(question => {
                return (<Question key={question.question} step={step} checkedValue={checkedValue} question={question.question} answers={question.answers} handleAnswerClick={handleAnswerClick}/>);
            })}
        </Container>
    );
}

QuestionList.propTypes = {
    questions: PropTypes.array.isRequired,
    handleAnswerClick: PropTypes.func.isRequired
};

export default QuestionList;
