import React, { PropTypes } from 'react';
import QuestionList from './questionList';
import {Card,Container,Radio,Button,Label,Form,TextArea} from 'semantic-ui-react'
const Quiz = ({ step, questions, totalQuestions, score, handleAnswerClick,format,settimer }) => {
 return (
  <div className="wrapper">
  <Card fluid>
  <Card.Content>
  <Card.Header>
  <span className="time">{format}</span>
{/* <Button onClick={settimer}>Start test</Button> */}


React
<div className='sider'>
</div>

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

<Label color='blue'>Question {step} of {totalQuestions}</Label>
<Label color='teal'>Current Score = {score}</Label>

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
