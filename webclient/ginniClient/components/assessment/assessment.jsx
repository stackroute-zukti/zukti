import React, {Component, PropTypes} from 'react';
import Quiz from './quiz.jsx';
import Results from './results';
import leftmenuContent from '../leftmenuPusherContent/leftmenuContent';
import leftmenu from '../leftmenu/leftmenu';
import shuffleQuestions from './helpers/shuffleQuestions';
import Cookie from 'react-cookie';

import Title from 'react-title-component';
import Mousetrap from 'mousetrap';
import GithubCorner from 'react-github-corner';
import AssessmentTimer from './testtimerinstruction'
import moment from 'moment';
var totalFluke = 0;
var totalScore = 0;
var correct = 0;
var rank = 0;
var i = 0;

let set = new Set();
let set1 = new Set();
import {hashHistory} from 'react-router';

export default class Assessment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            play: false,
            timeType: 0,
            title: ''
        };
        this.state = {
            questions: [],
            userAnswers: [],
            step: 0,
            score: 0,
            questionLength: 0,
            firstname: '',
            graphQuestions: [],
            flag1: 'practice'
        };

        this.handleAnswerClick = this.handleAnswerClick.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.fetchValuesFromDatabase = this.fetchValuesFromDatabase.bind(this);
    }

    getQuestions()
    {
        console.log("inside getW")
        $.ajax({
            url: '/assessmentQuestion/getAssesmentQuestion',
            type: 'POST',
            data: {
                domain: "react"
            },
            success: function(response) {
                console.log("here: " + response);

                this.setState({
                    questions: response,
                    userAnswers: response.map(question => {
                        return {tries: 0}
                    }),
                    step: 1,
                    score: 0,
                    flag: 'assessment',
                    questionLength: response.length,
                    graphQuestions: response
                });

            }.bind(this),
            error: function(err) {
                console.log(err);
            }.bind(this)
        });
    }
    componentWillMount()
    {
        this.getQuestions();
    }
    handleAnswerClick(e) {
        const {questions, step, userAnswers} = this.state;
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
            this.setState({userAnswers: answersFromUser});
            setTimeout(() => {
                const praise = document.querySelector('.praise');
                const bonus = document.querySelector('.bonus');
                if (tries === 0) {
                    praise.textContent = '1st Try!';
                    bonus.textContent = '+10';
                    set.add(questions[0].id);
                }
                if (tries === 1) {
                    praise.textContent = '2nd Try!';
                    bonus.textContent = '+5';
                    set1.add(questions[0].id);
                }
                if (tries === 2) {
                    praise.textContent = 'Correct!';
                    bonus.textContent = '+2';
                    set1.add(questions[0].id);
                }
                if (tries === 3) {
                    praise.textContent = 'Correct!';
                    bonus.textContent = '+1';
                    set1.add(questions[0].id);
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
            this.setState({userAnswers: answersFromUser});
        }
    }
    flukeCount(tries3, tries4)
    {
        if (tries3 == undefined) {
            tries3 = 0;
        }
        if (tries4 == undefined) {
            tries4 = 0;
        }
        totalFluke = tries3 + tries4;
        this.storeData(totalScore);
    }

    setDifficultyDetails()
    {
        var correctarr = Array.from(set);
        var wrongarr = Array.from(set1);
        $.ajax({
            url: '/assessmentQuestion/setDifficulty',
            type: 'POST',
            data: {
                correctquestion: JSON.stringify(correctarr),
                wrongquestion: JSON.stringify(wrongarr)
            },
            success: function(response) {
                this.setd();
            }.bind(this),
            error: function(err) {
                console.log(err);
            }.bind(this)
        });
    }
    setd()
    {
        $.ajax({
            url: '/assessmentQuestion/setDifficulty',
            type: 'GET',
            success: function(response) {
                console.log(response);

            }.bind(this),
            error: function(err) {
                console.log(err);
            }.bind(this)
        });
    }
    setUserAttemptedDetails()
    {
        console.log("set1", set1);
        console.log("set", set);
        var correctarr = Array.from(set);
        var wrongarr = Array.from(set1);
        var email = Cookie.load("email");

        $.ajax({
            url: '/assessmentLearner/setUserAttemptedDetails',
            type: 'POST',
            data: {
                emailid: email,
                correctquestion: JSON.stringify(correctarr),
                wrongquestion: JSON.stringify(wrongarr)
            },
            success: function(response) {
                console.log(response);
                this.setDifficultyDetails();

            }.bind(this),
            error: function(err) {
                console.log(err);
            }.bind(this)
        });
    }
    setLearnerDetails()
    {
        var date = moment().format('L');
        var time = moment().format('LTS');
        var email = Cookie.load("email");
        $.ajax({
            url: '/assessmentLearner/setLearnerDetails',
            type: 'POST',
            data: {
                id: email,
                score: totalScore,
                rank: rank,
                fluke: totalFluke,
                attendedques: this.state.questionLength,
                time: time,
                date: date
            },
            success: function(response) {
                console.log(response);
                this.setUserAttemptedDetails();
            }.bind(this),
            error: function(err) {
                console.log(err);
            }.bind(this)
        });
    }

    storeData(score)
    {
        console.log(totalFluke);
        var email = Cookie.load("email");
        var authType = Cookie.load("authType");
        $.ajax({
            url: '/assessment/add',
            type: 'POST',
            data: {
                id: email,
                authType: authType,
                score: score,
                totalQuestionsAttempted: this.state.questionLength,
                noOfFluke: totalFluke
            },
            success: function(response) {
                console.log(response);
                rank = response.rank;
                this.setLearnerDetails();
            }.bind(this),
            error: function(err) {
                console.log(err);
            }.bind(this)
        });
    }
    componentDidMount()
    {
        this.fetchValuesFromDatabase();
    }
    fetchValuesFromDatabase() {
        var email = Cookie.load('email');
        var authType = Cookie.load('authType');
        var userDetails = [];
        $.ajax({
            url: '/dashboard/fetch',
            type: 'POST',
            data: {
                id: email,
                authType: authType
            },
            success: function(response) {
                this.setState({firstname: response[0].local.name})
            }.bind(this),
            error: function(err) {
                console.log(err);
            }.bind(this)
        });
    }

    setScore(score)
    {
        totalScore = totalScore + score;
    }

    nextStep() {
        document.querySelector('.correct-modal').classList.remove('modal-enter');
        document.querySelector('.bonus').classList.remove('show');
        const {questions, userAnswers, step, score} = this.state;
        const restOfQuestions = questions.slice(1);
        const currentStep = step - 1;
        const tries = userAnswers[currentStep].tries;
        this.setState({
            step: step + 1,
            score: (() => {
                if (tries === 1)
                    return score + 10;
                if (tries === 2)
                    return score + 5;
                if (tries === 3)
                    return score + 2;
                return score + 1;
            })(),
            questions: restOfQuestions
        });
    }

    //# Pradeep Kumar.R(2-5-2017){used to restart the quiz by callling the previous assesement component}
    restartQuiz() {
        var q = this.state.graphQuestions;
        i = 0;
        totalScore = 0;
        set.clear();
        set1.clear();
        this.setState({questions: q, step: 1, score: 0, time: 60});

    }

    render() {
        const {step, questions, userAnswers, score} = this.state;
        return (
            <div>
                {(() => {
                    if (step > this.state.questionLength) {
                        i++;
                        if (i == 1) {
                            this.setScore(score);
                        }
                        return (<Results score={score} flag1={this.state.flag1} firstname={this.state.firstname} totalQuestions={this.state.questionLength * 10} flukeCount={this.flukeCount.bind(this)} restartQuiz={this.restartQuiz.bind(this)} userAnswers={userAnswers}/>);
                    } else {
                        if (this.state.questionLength > 0) {
                            return (<Quiz flag={this.state.flag} flag1={this.state.flag1} step={step} questions={questions} totalQuestions={this.state.questionLength} score={score} handleAnswerClick={this.handleAnswerClick}/>);
                        }
                    }
                })()}

            </div>
        );
    }
}
// Assessment.defaultProps = {
//   totalQuestions: questions.length
// };
// Assessment.propTypes = {
//   totalQuestions: PropTypes.number.isRequired
// };
