import React, { Component, Fragment } from 'react'
import Helmet from 'react-helmet'
import checkCircle from '../../assets/check-circle.svg';
import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';
export class QuizSummary extends Component {
    /** 
     * @param {props} props The component receives the argument as a props object.
     */
    constructor(props) {
        super(props)
    
        this.state = {
             score :0,
             numberOfQuestions : 0,
             numberOfAnsweredQuestion : 0,
             correctAnswer : 0,
             wrongAnswer : 0,
        }
    }
    componentWillMount (){
        const { state } = this.props.history.location
        this.setState({
            score : (state.correctAnswer / state.numberOfQuestions) * 100 ,
            numberOfAnsweredQuestion : state.numberOfAnsweredQuestion,
            numberOfQuestions : state.numberOfQuestions,
            correctAnswer : state.correctAnswer,
            wrongAnswer : state.wrongAnswer
        })
    }
    handleLogout=()=>{
        localStorage.clear()
        this.props.history.push('/')
    }
    render() {
        const { state } = this.props.location
        let stats, remark;
        const userScore = this.state.score
        if(userScore <= 30 ){
            remark = 'You need more practice!';
        }else if (userScore > 30 && userScore <= 30){
            remark = 'Better Luck next time';
        }else if(userScore <= 70 && userScore > 50){
            remark = 'You can do better';
        }else if (userScore >= 71 && userScore <= 84){
            remark = 'You did greate!';
        }else{
            remark = 'You\'re an absolute genius!';
        }
        if( state !==undefined){
            stats = (
                <Fragment>
                       {/**
                         * This is use to give browser name of this Application.
                         */}
                <Helmet><title>Summary - Quiz App</title></Helmet>
                <div className="checkCircle">
                    <span > <img className="circle" src={checkCircle} alt="check circle"/></span>
                </div>
                <h1>Quiz has ended </h1>
                <div className="Total-score">
                <div className="container stats">
            <h4>{remark}</h4>
            <h2>Your Score : {this.state.score.toFixed(0)}&#37;</h2>
           
            <span className="stat-left"> Total number of question : </span>
            <span className="right">{this.state.numberOfQuestions}</span><br/>

            <span className="stat-left"> Number of Attemted Question  : </span>
            <span className="right">{this.state.numberOfAnsweredQuestion}</span><br/>

            <span className="stat-left"> Number of Correct Answer : </span>
            <span className="right">{this.state.correctAnswer}</span><br/>

            <span className="stat-left"> Number of wrong Answer : </span>
            <span className="right">{this.state.wrongAnswer}</span>   
            </div>
                </div>
                <section>
                    <ul>
                        <li>
                        <Button onClick={this.handleLogout} >LogOut</Button>
                        </li>
                    </ul>
                </section>
                </Fragment>
            )
        }else { 
            stats = (
                <section>
                <h1 className="no-stats"> No Statistics Available</h1>
                <ul>
                    <li>
                        <Button onClick={this.handleLogout} >LogOut</Button>
                        {/* <Link to = '/'>Back to Home Page</Link> */}
                    </li>
                    <li>
                        <Link to = '/play/quiz'>Take a Quiz</Link>
                    </li>
            </ul>
            </section>
            )
        }
        return (
            <div>
               <Fragment>
                   <Helmet><title>Quiz App - Summary </title></Helmet>
                   {/**
                    * This is use to display summary of the student.
                    */}
                  <div className="quiz-summary">
                   {stats}
                   </div>
               </Fragment>
            </div>
        )
    }
}

export default QuizSummary
