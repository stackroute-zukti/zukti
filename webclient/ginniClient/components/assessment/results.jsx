import React, { PropTypes ,Component} from 'react';
import {Card,Button,Segment,Grid} from 'semantic-ui-react'

import tally from './helpers/tally';
const Results = ({ userAnswers, score, restartQuiz, flukeCount,fullscoreresult,totallengthques,totalQuestions }) => {
  // console.log(userAnswers);
  // console.log(score)
  const triesTotal = tally(userAnswers);
  const oneTries = triesTotal[1] && <div><strong>{triesTotal[1]}</strong> on the first try.</div>;
  const twoTries = triesTotal[2] && <div><strong>{triesTotal[2]}</strong> on the second try.</div>;
  const threeTries = triesTotal[3] && <div><strong>{triesTotal[3]}</strong> on the third try.</div>;
  const fourTries = triesTotal[4] && <div><strong>{triesTotal[4]}</strong> on the fourth try.</div>;

 {
   flukeCount(triesTotal[3],triesTotal[4])};
  return (
   <div className="results-container">
   <div>
     <Card fluid>
     <Card.Content>
     <Card.Header>

 <strong>
   Quiz Results
   </strong><br/>
 </Card.Header>

 </Card.Content>

 <Card.Content extra>

 <strong>You answered...</strong><br/>
   <strong> {oneTries} </strong>
   <strong>{twoTries} </strong>
   <strong> {threeTries}  </strong>
   <strong> {fourTries}</strong>


 <div className="results-total"><strong>Your Total Score is </strong><strong>{score}/{totalQuestions}</strong></div>
   <a><Button  color='green' align='center' onClick={restartQuiz}>Restart Assessment</Button></a> <br/><br/>

   <a href="#/chat/react" ><Button color='red' align='center' icon='ticket'>End Assessment</Button></a>


 </Card.Content>

</Card>


   </div>
   </div>

 );
}

Results.propTypes = {
  userAnswers: PropTypes.array.isRequired,
  score: PropTypes.number.isRequired,
  restartQuiz: PropTypes.func.isRequired
};

export default Results;
