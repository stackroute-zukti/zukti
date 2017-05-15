import React, {Component, PropTypes} from 'react';
import Quiz from './quiz';
import Results from './results';
import leftmenuContent from '../leftmenuPusherContent/leftmenuContent';
import leftmenu from '../leftmenu/leftmenu';
//import questions from '../../../../QuizData/quiz-data';
import shuffleQuestions from './helpers/shuffleQuestions';
import Cookie from 'react-cookie';
var questions = require('../../../../QuizData/quiz-data');
import Title from 'react-title-component';
import Mousetrap from 'mousetrap';
import GithubCorner from 'react-github-corner';


var totalFluke = 0;
var totalScore = 0;
var correct=0;
import {hashHistory} from 'react-router';

//const QUESTIONS = questions.slice(0,10);
const QUESTIONS=shuffleQuestions(questions)
// console.log(QUESTIONS);

export default class Assessment extends Component {
 constructor(props) {
  super(props);
  // console.log('print',QUESTIONS)
  // console.log('The questions to be answered',QUESTIONS);
  // console.log(QUESTIONS.length);
  this.state = {
    time: 0,
    play: false,
    timeType: 0,
    title: ''
  };
  this.state = {
    questions: QUESTIONS,
    userAnswers: QUESTIONS.map(question => {
      return {
        tries: 0
      }
    }),
    step: 1,
    score:0
  };

  this.handleAnswerClick = this.handleAnswerClick.bind(this);
  this.nextStep = this.nextStep.bind(this);
  this.setTimeForCode = this.setTime.bind(this, 1500);
  this.setTimeForSocial = this.setTime.bind(this, 60);
  this.setTimeForCoffee = this.setTime.bind(this, 900);
  this.reset = this.reset.bind(this);
  this.play = this.play.bind(this);
  this.elapseTime = this.elapseTime.bind(this);


}

handleAnswerClick(e) {
  correct=0;
  const { questions, step, userAnswers } = this.state;
    const isCorrect = questions[0].answers[questions[0].correct] === e.target.innerText;
    const answersFromUser = userAnswers.slice();
    const currentStep = step - 1;
    const tries = answersFromUser[currentStep].tries;
    // console.log("tries"+tries);
    if(isCorrect)
    {
      // console.log("correct")
      correct=1;
    }
    if (e.target.innerText) {
      document.querySelector('.question:first-child').style.pointerEvents = 'none';


      answersFromUser[currentStep] = {
        tries: tries + 1
      };

      this.setState({
        userAnswers: answersFromUser
      });



      setTimeout(() => {
        const praise = document.querySelector('.praise');
        document.querySelector('.bonus').classList.add('none');


        if (tries === 0) {
          praise.textContent = '1st Try!';
          bonus.textContent = '+10';
        }
        if (tries === 1) {
          praise.textContent = '2nd Try!';
          bonus.textContent = '+0';
        }
        if (tries === 2) {
          praise.textContent = 'Correct!';
          bonus.textContent = '+0';
        }
        if (tries === 3) {
          praise.textContent = 'Correct!';
          bonus.textContent = '+0';
      }
        document.querySelector('.correct-modal').classList.add('none');

      }, 750);

      setTimeout(this.nextStep, 500);

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
        // console.log(response);

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
      const { questions, userAnswers, step, score } = this.state;
      const restOfQuestions = questions.slice(1);
      const currentStep = step - 1;
      const tries = userAnswers[currentStep];
      // console.log(tries);
      this.setState({
        step: step + 1,
        score: (() => {
          if (correct === 1) return score + 10;

          return score + 0;
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



componentDidMount() {
  this.setDefaultTime();
  this.startShortcuts();
  Notification.requestPermission();
}

elapseTime() {
  if (this.state.time === 0) {
    this.reset(0);
    this.alert();
  }
  if (this.state.play === true) {
    let newState = this.state.time - 1;
    this.setState({time: newState, title: this.getTitle(newState)});
  }
}

format(seconds) {
  let m = Math.floor(seconds % 3600 / 60);
  let s = Math.floor(seconds % 3600 % 60);
  let timeFormated = (m < 10 ? "0" : "") + m + ":" + (s < 10 ? "0" : "") + s;
  // console.log('timeFormated',timeFormated)
  if(timeFormated<0)
  {
    hashHistory.push("#/chat/react")
  }
  return timeFormated;
}

getFormatTypes() {
  return [
  {type: "code", time: 1500},
  {type: "social", time: 60},
  {type: "coffee", time: 900}
  ];
}

formatType(timeType) {
  let timeTypes = this.getFormatTypes();
  for(let i=0; i<timeTypes.length; i++) {
    let timeObj = timeTypes[i];
    if(timeObj.time === timeType) {
      return timeObj.type;
    }
  }
  return null;
}

restartInterval() {
  clearInterval(this.interval);
  this.interval = setInterval(this.elapseTime, 1000);
}

play() {
  if (true === this.state.play) return;

  this.restartInterval();

  this.setState({
    play: true
  });
}

reset(resetFor = this.state.time) {
  clearInterval(this.interval);
  let time = this.format(resetFor);
  this.setState({play: false});
}

togglePlay() {
  if (true === this.state.play)
    return this.reset();

  return this.play();
}

setTime(newTime) {
  this.restartInterval();

  this.setState({
    time: newTime,
    timeType: newTime,
    title: this.getTitle(newTime),
    play: true
  });
}

setDefaultTime() {
  let defaultTime = 60;

  this.setState({
    time: defaultTime,
    timeType: defaultTime,
    title: this.getTitle(defaultTime),
    play: false
  });
}

getTitle(time) {
  time = typeof time === 'undefined' ? this.state.time : time;
  let _title = this.format(time) + ' | Pomodoro timer';
  return _title;
}

startShortcuts() {
  Mousetrap.bind('space', this.togglePlay.bind(this));
  Mousetrap.bind(['ctrl+left', 'meta+left'], this.toggleMode.bind(this,-1));
  Mousetrap.bind(['ctrl+right', 'meta+right'], this.toggleMode.bind(this,1));
}

toggleMode(gotoDirection) {
  let timeTypes = this.getFormatTypes();
  let currentPosition = -1;


  for (let i = 0; i < timeTypes.length; i++) {
    if (timeTypes[i].time === this.state.timeType) {
      currentPosition = i;
      break;
    };
  };

  if (currentPosition !== -1) {
    let newMode = timeTypes[currentPosition + gotoDirection];
    if (newMode) this.setTime(newMode.time);
  };
}

_setLocalStorage (item, element) {
  let value = element.target.checked;
  localStorage.setItem('react-pomodoro-' + item, value);
}

_getLocalStorage (item) {
  return (localStorage.getItem('react-pomodoro-' + item) == 'true') ? true : false;
}

alert() {

    // notification
    if(this.refs.notification.checked) {
      if (this.state.timeType === 100) {
        let notification = new Notification("Relax :)", {
          icon: "img/coffee.png",
          lang: "en",
          body: "Go talk or drink a coffee."
        });
      } else {
        let notification = new Notification("The time is over!", {
          icon: "img/code.png",
          lang: "en",
          body: "Hey, back to code!"
        });
      }
    }
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
