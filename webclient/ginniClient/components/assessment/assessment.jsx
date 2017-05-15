import React, {Component, PropTypes} from 'react';
import Quiz from './quiz';
import Results from './results';
import leftmenuContent from '../leftmenuPusherContent/leftmenuContent';
import leftmenu from '../leftmenu/leftmenu';
//import questions from '../../../../QuizData/quiz-data';
import shuffleQuestions from './helpers/shuffleQuestions';
import Cookie from 'react-cookie';
var questions = require('../../../../QuizData/quiz-data');
var totalFluke = 0;
var totalScore = 0;
import {hashHistory} from 'react-router';

//const QUESTIONS = questions.slice(0,10);
const QUESTIONS=shuffleQuestions(questions)

export default class Assessment extends Component {
 constructor(props) {
  super(props);
		// console.log('print',QUESTIONS)
    //       console.log('The questions to be answered',QUESTIONS);
		// 			console.log(QUESTIONS.length);
    this.state = {
      questions: QUESTIONS,
      totallengthques:QUESTIONS.length,
      userAnswers: QUESTIONS.map(question => {
        return {
          tries: 0
        }
      }),
      step: 1,
      score:0,
    };
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
    this.nextStep = this.nextStep.bind(this);

  }

  handleAnswerClick(e) {
    const { questions, step, userAnswers } = this.state;
    const isCorrect = questions[0].answers[questions[0].correct] === e.target.innerText;
    const answersFromUser = userAnswers.slice();
    const currentStep = step - 1;
    const tries = answersFromUser[currentStep].tries;

    if (isCorrect) {

      document.querySelector('.question:first-child').style.pointerEvents = 'none';

      e.target.classList.add('right');

      answersFromUser[currentStep] = {
        tries: tries + 1
      };

      this.setState({
        userAnswers: answersFromUser
      });



      setTimeout(() => {
        const praise = document.querySelector('.praise');
        const bonus = document.querySelector('.bonus');

        if (tries === 0) {
          praise.textContent = '1st Try!';
          bonus.textContent = '+10';
        }
        if (tries === 1) {
          praise.textContent = '2nd Try!';
          bonus.textContent = '+5';
        }
        if (tries === 2) {
          praise.textContent = 'Correct!';
          bonus.textContent = '+2';
        }
        if (tries === 3) {
          praise.textContent = 'Correct!';
          bonus.textContent = '+1';
        }
        document.querySelector('.correct-modal').classList.add('modal-enter');
        document.querySelector('.bonus').classList.add('show');

      }, 750);

      setTimeout(this.nextStep, 2750);

    } else {

      e.target.style.pointerEvents = 'none';
      e.target.classList.add('wrong');

      answersFromUser[currentStep] = {
        tries: tries + 1
      };
      this.setState({
        userAnswers: answersFromUser
      });

    }
  }

  flukeCount(tries3,tries4)
  {
    if(tries3==undefined)
    {
      tries3=0;
    }
    if(tries4==undefined)
    {
      tries4=0;
    }
    totalFluke=tries3+tries4;
    // console.log(totalFluke);
    this.storeData(totalScore);
  }

  storeData(score)
  {
          //console.log(score);
      //console.log("inside store");
      var email=Cookie.load("email");
      var authType=Cookie.load("authType");
      //console.log(totalFluke);
      $.ajax({
        url: '/assessment/add',
        type: 'POST',
        data: {
         id:email,
         authType:authType,
         score:score,
         totalQuestionsAttempted:QUESTIONS.length,
         noOfFluke:totalFluke
       },
       success: function(response) {
                            //   console.log(response);

                          },
                          error: function(err) {
                            console.log(err);
                          }.bind(this)
                        });
    }
    setScore(score)
    {
      totalScore=totalScore+score;
      // console.log("total"+totalScore);
    }

    nextStep() {
		// console.log("inside nextstep");
    document.querySelector('.correct-modal').classList.remove('modal-enter');
    document.querySelector('.bonus').classList.remove('show');
    const { questions, userAnswers, step, score } = this.state;
    const restOfQuestions = questions.slice(1);
    const currentStep = step - 1;
    const tries = userAnswers[currentStep].tries;
    this.setState({
      step: step + 1,
      score: (() => {
        if (tries === 1) return score + 10;
        if (tries === 2) return score + 5;
        if (tries === 3) return score + 2;
        return score + 1;
      })(),
      questions: restOfQuestions
    });
  }
//# Pradeep Kumar.R(2-5-2017){used to restart the quiz by callling the previous assesement component}
restartQuiz() {
  totalScore = 0;
  this.setState({
   questions: shuffleQuestions(questions),
   userAnswers: QUESTIONS.map(question => {
     return {
      tries: 0
    }
  }),
   step: 1,
   score: 0
 });
}
render() {
  const { totalQuestions } = this.props;
  const { step, questions, userAnswers, score } = this.state;
  return (
    <div>
    {(() => {
					// console.log("totalQuestions");
					// console.log('lengthOfTQ:',totalQuestions);
					// console.log('step value:',step);
          if (step >= totalQuestions + 1) {
						// console.log("1st1sst");
            {this.setScore(score)}
            return (
              <Results
              score={score}
              totalQuestions={totalQuestions*10}

              restartQuiz={this.restartQuiz.bind(this)}
              userAnswers={userAnswers}
              flukeCount={this.flukeCount.bind(this)}
              />
              );
          } else return (

            <Quiz
            step={step}
            questions={questions}
            totalQuestions={totalQuestions}
            score={score}
            handleAnswerClick={this.handleAnswerClick}
            />
            );
          })()}
          </div>
          );
}
}
Assessment.defaultProps = {
  totalQuestions: QUESTIONS.length
};
Assessment.propTypes = {
  totalQuestions: PropTypes.number.isRequired
};
