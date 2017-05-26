import React, {PropTypes} from 'react';
import Answer from './answer';
import {List} from 'semantic-ui-react'

const Question = ({step, checkedValue, question, answers, handleAnswerClick}) => {
    return (
        <List className="question">
            <List.Item>
                <List.Header className="question-title">{step + ". " + question}</List.Header>
            </List.Item>
            <List.Item className="question-answers">
                {answers.map(answer => {
                    return (<Answer key={answer} checkedValue={checkedValue} answer={answer} handleAnswerClick={handleAnswerClick}/>);
                })}
            </List.Item>
        </List>
    );
}

Question.propTypes = {
    question: PropTypes.string.isRequired,
    answers: PropTypes.array.isRequired,
    handleAnswerClick: PropTypes.func.isRequired
};

export default Question;
