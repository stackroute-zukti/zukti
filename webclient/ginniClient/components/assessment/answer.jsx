import React, {PropTypes} from 'react';
import {Radio} from 'semantic-ui-react'

const Answer = ({checkedValue, answer, handleAnswerClick}) => {

    return (
        <li className="question-answer">

            <Radio label={answer} style={{
                color: 'red'
            }} name='radioGroup' value={answer} checked={checkedValue === answer} onChange={handleAnswerClick}/>
        </li>
    );
}

Answer.propTypes = {
    answer: PropTypes.string.isRequired,
    handleAnswerClick: PropTypes.func.isRequired
};

export default Answer;
