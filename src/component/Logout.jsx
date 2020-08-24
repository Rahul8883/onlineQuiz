import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@material-ui/core';
/**
 * 
 * @param {Object} props 
 */
function Logout(props) {
  /**
   * 
   * @param {Object} event - contains event fired on button click 
   */
  const handleRegister = (event) => {
    event.preventDefault();
    props.history.push("/login");
  }
  
  return (
    <Fragment>
    {/**
     * This is use to give browser name of this Application.
     */}
    <Helmet> <title>Quiz App -  Home</title></Helmet>
    <div id="result">
    <section>
        <div className="container">
      <h1>you cannot go back to test please Login again</h1>
      <Button varient="contained" size="medium" id="btn" onClick={handleRegister}>Login</Button>
      </div>
   </section>
    </div>
    </Fragment>
  );
}

export default Logout;