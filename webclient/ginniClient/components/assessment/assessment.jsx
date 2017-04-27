import React, {Component, PropTypes} from 'react';
import Quiz from './quiz';
import Results from './results';
//import questions from '../../../../QuizData/quiz-data';
var QUESTIONS = require('../../../../QuizData/quiz-data');
//const QUESTIONS = questions.slice(0,10);

export default class Assessment extends Component {
	  constructor(props) {
    super(props);
          console.log('The questions to be answered',QUESTIONS);

    this.state = {
        questions: QUESTIONS.default,
      userAnswers: QUESTIONS.default.map(question => {
        return {
          tries: 0
        }
      }),
      step: 1,
      score: 0
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

  nextStep() {
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

  restartQuiz() {
    console.log('***********');
    this.props.restart();
  }

  render() {
    const { totalQuestions } = this.props;
    const { step, questions, userAnswers, score } = this.state;
    return (
      <div>
        {(() => {
          if (step >= totalQuestions + 1) {
            return (
              <Results
                score={score}
                restartQuiz={this.restartQuiz}
                userAnswers={userAnswers}
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
  totalQuestions: QUESTIONS.default.length
};

Assessment.propTypes = {
  totalQuestions: PropTypes.number.isRequired
};