import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import {Link} from 'react-router-dom';
/**
 * This function is use to create the landing/welcome page of this app{Home}
 */
const Home = () => (
    <Fragment>
        {/**
         * This is use to give browser name of this Application.
         */}
        <Helmet> <title>Quiz App -  Home</title></Helmet>
        <div id="home">
        <section>
            <div style={{ textAlign:"center"}}>
                <img src ={require ('../assets/landingPageIcon.svg')} alt="tpglogo" style={{width:"8rem", textAlign:"center", marginBottom:"3rem", marginTop:"3rem"}}/>
            </div>
            <h1>Quiz App</h1>
            <div className="play-button-container">
              
                <ul id="homeTitleMain">
                    <li id="homeTitle">3Pillar Global Examination</li>
                </ul>
            </div>
            {/**
             * These Buttons are use to Take action For Login and Registration Page.
             */}
            <div className="auth-container">
                <Link to="/login" className="auth-buttons" id="login-button">Login</Link>
                <Link to="registration" className="auth-buttons" id="register-button">Register</Link>
            </div>
        </section>
        </div> 
    </Fragment>
)
/**
 * Make available for another file and folder.
 */
export default Home;