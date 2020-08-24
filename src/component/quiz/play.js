import React, { Component, Fragment } from 'react'
import { Helmet } from "react-helmet";
import Lifeline from '../../assets/lifeline.svg'
import Bulb from '../../assets/50-50.svg'
import Countdown from '../../assets/countdown.svg'
import question from '../../question.json';
import isEmpty from '../../utils/is-Empty';
import correctNotification from '../../assets/audio/Correct-answer.mp3';
import wrongNotification from '../../assets/audio/Wrong-answer-sound-effect.mp3';
import buttonNotification from '../../assets/audio/button-3.mp3';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
export class Play extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questions: question,
            queBoard: [],
            currentQuestion: {},
            nextQuestion: {},
            previousQuestion: {},
            answer: "",
            numberOfQuestions: 0,
            numberOfAnsweredQuestion: 0,
            currentQuestionIndex: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            usedFiftyFiofty: false,
            time: {},
            nextButtonDisabled: false,
            previousButtonDisabled: true,
            rightAnswer: [],
            incorrectAnswer: [],
            count: 0,
            queCount: "",
            distValue: localStorage.getItem('distance')
        }
        this.interval = null;
        this.correctSound = React.createRef();
        this.wrongSound = React.createRef();
        this.buttonSound = React.createRef();
    }

    componentDidMount() {
        const { questions, currentQuestion, nextQuestion, previousQuestion } = this.state;
        if (localStorage.getItem("pageLoad") === null) {
            localStorage.setItem("pageLoad1", "N")
            this.setState({
                count: 1,
                queBoard: JSON.parse(localStorage.getItem('question')),
                currentQuestion: JSON.parse(localStorage.getItem('currentQuestion')),
                nextQuestion: JSON.parse(localStorage.getItem('nextQuestion')),
                previousQuestion: JSON.parse(localStorage.getItem('previousQuestion')),
                numberOfQuestions: localStorage.getItem("numberOfQuestions"),
                queCount: localStorage.getItem("queCount")
            })
            this.startTimer();
            this.displayQuestions(this.state.queBoard, currentQuestion, nextQuestion, previousQuestion);
        } else {            
            this.displayQuestions(questions, currentQuestion, nextQuestion, previousQuestion);
            this.startTimer();
            this.setState({
                queBoard: this.state.questions
            })
        }
        window.onpopstate = e => {
            this.props.history.push("/logout");
        }
    }

    componentWillMount() {
        clearInterval(this.interval)
    }
    /**
     * @param {questions} questions Questions of this Quiz.
     * @param {currentQuestion} currentQuestion Current question of this quiz which is appear in display(only one at that time).
     * @param {nextQuestion} nextQuestion Next question which is occur when finish the current question.
     * @param {previousQuestion} previousQuestion Previous question which is left or may be you want to recheck.
     */
    displayQuestions = (questions = this.state.questions, currentQuestion, nextQuestion, previousQuestion) => {
        let { currentQuestionIndex } = this.state;
         var questionData;
        if (!isEmpty(questions)) {
            questions = this.state.questions;
            currentQuestion = questions[currentQuestionIndex];
            nextQuestion = questions[currentQuestionIndex + 1];
            previousQuestion = questions[currentQuestionIndex - 1];
            const answer = currentQuestion.answer;
            if (localStorage.getItem('numberOfQuestions')!== 0) {
                questionData = localStorage.getItem('numberOfQuestions')
            } else {
                questionData = questions.length
            }
            this.setState({
                currentQuestion,
                nextQuestion,
                previousQuestion,
                numberOfQuestions: questions.length,
                answer,
                queCount: currentQuestionIndex + 1
            },console.log(this.state.queCount),
             () => {
                this.handleDisableButton();
            })
            localStorage.setItem('question', JSON.stringify(this.state.questions));
            localStorage.setItem("currentQuestion", JSON.stringify(currentQuestion))
            localStorage.setItem("nextQuestion", JSON.stringify(nextQuestion))
            localStorage.setItem("previousQuestion", JSON.stringify(previousQuestion))
            localStorage.setItem("numberOfQuestions", this.state.numberOfQuestions)
            localStorage.setItem("answer", answer)
            localStorage.setItem("queCount", this.state.queCount)
            localStorage.removeItem('pageLoad')
        }
    }
    /**
     * handleOptionClick, is use to handle option for select and check either correct or wrong.
     */
    handleOptionClick = (e) => {
        if (e.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()) {
            setTimeout(() => {
                this.correctSound.current.play();
            }, 500)
            /**
             * correct answer method binding.
             */
            this.checkAnswer(1);
        } else {
            setTimeout(() => {
                this.wrongSound.current.play();
            }, 500)
            /**
             *  Wrong answer method binding.
             */
            this.checkAnswer(0);
        }
    }
    /**
     * @param {value} value this parameter is use to check the value which is selected from end user.
     */
    checkAnswer = (value) => {
        try {
            if (value) {
                if (this.state.rightAnswer.length > 0) {
                    const found = this.state.rightAnswer.find(element => element.id === this.state.currentQuestion.id);
                    if (found !== undefined) {
                        this.getNextQuestion()
                    } else {
                        this.state.rightAnswer.push(this.state.currentQuestion)
                        const NotFound = this.state.incorrectAnswer.find(element => element.id === this.state.currentQuestion.id);
                        if (NotFound !== undefined) {
                            const findIndex = ((element) => element.id === this.state.currentQuestion.id);
                            this.state.incorrectAnswer.pop(findIndex)
                        }
                        this.getNextQuestion()
                    }
                }
                else {
                    const NotFound = this.state.incorrectAnswer.find(element => element.id === this.state.currentQuestion.id);
                    if (NotFound !== undefined) {
                        const findIndex = ((element) => element.id === this.state.currentQuestion.id);
                        this.state.incorrectAnswer.pop(findIndex)
                    }
                    this.state.rightAnswer.push(this.state.currentQuestion)
                    this.getNextQuestion();
                }
            } else {
                if (this.state.incorrectAnswer.length > 0) {
                    const found = this.state.incorrectAnswer.find(element => element.id === this.state.currentQuestion.id);
                    if (found !== undefined) {
                        this.getNextQuestion()
                    } else {
                        this.state.incorrectAnswer.push(this.state.currentQuestion)
                        const NotFound = this.state.rightAnswer.find(element => element.id === this.state.currentQuestion.id);
                        if (NotFound !== undefined) {
                            const findIndex = ((element) => element.id === this.state.currentQuestion.id);
                            this.state.rightAnswer.pop(findIndex)
                        }
                        this.getNextQuestion()
                    }
                } else {
                    const NotFound = this.state.rightAnswer.find(element => element.id === this.state.currentQuestion.id);
                    if (NotFound !== undefined) {
                        const findIndex = ((element) => element.id === this.state.currentQuestion.id);
                        this.state.rightAnswer.pop(findIndex)
                    }
                    this.state.incorrectAnswer.push(this.state.questions[this.state.currentQuestionIndex])
                    this.getNextQuestion();
                }
                localStorage.setItem("correctAnswer", this.state.correctAnswers);
                localStorage.setItem("IncoorectAnswer", this.state.incorrectAnswer.length);
            }
        } catch (error) {
            console.log("Error occur while checking result", error);
        }
    }

    /**
     * handleNextButtonClick, This handler method is to handle the next button click. 
     */
    handleNextButtonClick = () => {
        /**
         * playButtonSound, method binding.
         */
        this.playButtonSound();
        if (this.state.nextQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex + 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            })
        }
    }

    /**
     * handleNextButtonClick, This handler method is to handle the next button click. 
     */
    handlePreviousButtonClick = () => {
        this.playButtonSound();
        if (this.state.previousQuestion !== undefined) {
            this.setState(prevState => ({
                currentQuestionIndex: prevState.currentQuestionIndex - 1
            }), () => {
                this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            })
        }
    }
    
    /**
     * handleNextButtonClick, This handler method is to handle the next button click. 
     */
    handleQuitButtonClick = () => {
        /**
        * playButtonSound, method binding.
        */
        this.playButtonSound();
        if (window.confirm('Are you sure, you want to Quit?')) {
            this.props.history.push('/')
        }
    }

    handleSubmitButtonClick= () =>{
        if (window.confirm('Are you sure, you want to Quit?')) {
            this.endGame();
        }
    }
    /**
     * this function is use to handle previous, next, and quit button during exam process.
     */
    handleButtonClick = (e) => {
        switch (e.target.id) {

            case "next-button":
                this.handleNextButtonClick();
                break;

            case "previous-button":
                this.handlePreviousButtonClick();
                break;

            case "quit-button":
                this.handleQuitButtonClick();
                break;

            case "submit-button":
                this.handleSubmitButtonClick();
            break;

            default:
                break;
        }
    }
    /**
     * This function is use to handle button sound when heating next, previous and quit button.
     */
    playButtonSound = () => {
        this.buttonSound.current.play();
    }
    /**
     * This function is use to handle next button during quiz.
     */
    getNextQuestion = () => {
        this.setState(prevState => ({
            correctAnswers: prevState.correctAnswers + 1,
            currentQuestionIndex: prevState.currentQuestionIndex + 1,
            numberOfAnsweredQuestion: this.state.rightAnswer.length + this.state.incorrectAnswer.length
        }), () => {
            if (this.state.nextQuestion === undefined) {
                //End function call when total number of question is end.
                this.endGame();
            } else {
                this.displayQuestions(this.state.questions, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
            }
        })
    }
    /**
     * This function is use to set Timer for Quiz.
     */
    preventReload = () => {
        if (window.location.reload()) {
            this.endGame();
        }
    }
    startTimer = () => {
        var distance;
        var countDownTime1 = 0;
        if (localStorage.getItem("pageLoad1") === "N") {
            // countDownTime1 = Date.now() + this.state.distValue;
            countDownTime1 = localStorage.getItem("remTime")
        } else {
            countDownTime1 = Date.now() + 180000;
            localStorage.setItem("remTime", countDownTime1)
        }
        const countDownTime = countDownTime1;
        this.interval = setInterval(() => {
            const now = new Date();
            distance = countDownTime - now;
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            if (distance < 0) {
                clearInterval(this.interval);
                this.setState({
                    time: {
                        minutes: 0,
                        seconds: 0
                    }
                }, () => {
                    this.endGame();
                })
            } else {
                this.setState({
                    time: {
                        minutes,
                        seconds
                    }
                })
            }
        }, 1000)
    }
    /**
     * This function is use to define the logic for end the Quiz.
     */
    endGame = () => {
        alert("Quiz has ended!");
        const { state } = this;
        const playerStats = {
            numberOfQuestions: state.numberOfQuestions,
            numberOfAnsweredQuestion: state.rightAnswer.length + state.incorrectAnswer.length,
            correctAnswer: state.rightAnswer.length,
            wrongAnswer: state.incorrectAnswer.length,
        }
        setTimeout(() => {
            this.props.history.push('/play/QuizSummary', playerStats)
        }, 1000)
    }
    /**
     * This function is use to set button desable oe enable on your own limitations.
     */
    handleDisableButton = () => {
        if (this.state.previousQuestion === undefined && this.state.currentQuestionIndex === 0) {
            this.setState({
                previousButtonDisabled: true
            })
        } else {
            this.setState({
                previousButtonDisabled: false
            })
        }
        if (this.state.nextQuestion === undefined && this.state.currentQuestionIndex + 1 === this.state.numberOfQuestions) {
            this.setState({
                nextButtonDisabled: true
            })
        } else {
            this.setState({
                nextButtonDisabled: false
            })
        }
    }

    handleBoard = (index) => {
        this.playButtonSound();
        this.setState(prevState => ({
            currentQuestionIndex: index
        }), () => {
            this.displayQuestions(this.state.state, this.state.currentQuestion, this.state.nextQuestion, this.state.previousQuestion)
        })
    }

    render() {
        const { currentQuestion, queCount, numberOfQuestions, time } = this.state;
        return (
            <Fragment>
                <Helmet><title>Quiz Page</title></Helmet>
                <Fragment>
                    <audio ref={this.correctSound} src={correctNotification}></audio>
                    <audio ref={this.wrongSound} src={wrongNotification}></audio>
                    <audio ref={this.buttonSound} src={buttonNotification}></audio>
                </Fragment>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
                    <Card id="QuestionBoard"> Question Board
                        {this.state.queBoard.map((data, index) => {
                            return (
                                <span key={index} id="QuestionBoardData" onClick={() => { this.handleBoard(index) }}> 
                                    {index + 1}
                                </span>
                            )
                        })
                        }
                    </Card>
                    <div className="questions">
                        <h1>Quiz Mode</h1>
                        <div className="lifeline-container">
                            <p className="lifeline"><span><img src={Lifeline} alt="life-line" className="img-size" /> </span></p>
                            <p><span><img src={Bulb} alt="life-line" className="img-size" /> </span> <span className="lifeline"></span></p>
                        </div>
                        <div className="lifeline-container">
                            <p><span className="lifeline">{queCount} of {numberOfQuestions}</span></p>
                            <p> <span><img src={Countdown} alt="timer" className="img-size" /></span><span className="lifeline">{time.minutes} : {time.seconds}</span></p>
                        </div>
                        <h5>{currentQuestion.question} </h5>
                        <div className="options-container">
                            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionA}</p>
                            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionB}</p>
                        </div>
                        <div className="options-container">
                            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionC}</p>
                            <p onClick={this.handleOptionClick} className="option">{currentQuestion.optionD}</p>
                        </div>
                        <div className="button-container">
                            <button
                                className={classnames('', { 'disable': this.state.previousButtonDisabled })}
                                id="previous-button"
                                onClick={this.handleButtonClick}>
                                Previous
                        </button>
                            <button
                                className={classnames('', { 'disable': this.state.nextButtonDisabled })}
                                id="next-button"
                                onClick={this.handleButtonClick}>
                                Next
                        </button>
                            <button id="quit-button" onClick={this.handleButtonClick}>Quit</button>

                           
                        </div>
                        <button id="submit-button" onClick={this.handleButtonClick}>Submit</button>
                    </div>

                </div>
            </Fragment>


        )
    }
}

export default Play
