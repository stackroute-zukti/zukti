import React, { PropTypes } from 'react';
import QuestionList from './questionList';
import {Card,Radio,Button,Label,Form,TextArea} from 'semantic-ui-react'
const Quiz = ({ step, questions, totalQuestions, score, handleAnswerClick }) => {
 return (
     <Card>
     <Card.Content>
       <Card.Header>
            React
       </Card.Header>
       <Card.Description>
           <QuestionList
             questions={questions}
             handleAnswerClick={handleAnswerClick}
             />
       </Card.Description>
     </Card.Content>
     <Card.Content extra>
      <div className='ui two buttons'>
        <Label>Question {step} of {totalQuestions}</Label>
        <Label>Current Score = {score}</Label>
      </div>
      <div className="correct-modal">
        <div className="praise">Correct!</div>
        <div className="bonus"></div>
      </div>
    </Card.Content>

  </Card>
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