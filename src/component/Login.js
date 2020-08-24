import React, { Component,Fragment } from 'react'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import Helmet from "react-helmet";
import {Link} from 'react-router-dom'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
export class Login extends Component {
    /**
     * 
     * @param {props} Property The component receives the argument as a props object. 
     */
    constructor(props) {
        super(props)
    
        this.state = {
             email :"",
             password : "",
             Email : localStorage.getItem('email'),
             Password : localStorage.getItem('password'),
             snackbarOpen: false,
             snackbarMsg: "",
             open : false,
             logedIn : false
        }
    }
    handleClose=()=>{
        this.setState({
            open : true
        })
    }
    /**
     * 
     * @param {e} event Every action perform on browser. 
     * @param {value} value which is passed from the end users.
     */
    handleEmail =(e, value)=>{
        if(value==="email" ){
        const email = e.target.value
        this.setState({email})
  }else if(value==="password"){
            const password = e.target.value
            this.setState({password})
        }
    }
  /**
   * After Compleate validation, this handler is use to submit the Login details and make access to main Quiz page.
   */
    handleSubmit=()=>{
        if (this.state.email=== "") {
            this.setState({
                snackbarOpen: true,
                snackbarMsg: "Email cann't be Empty !!"
            })
        }else if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email)) {
            console.log("entered", /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(this.state.email));
            this.setState({
                snackbarOpen: true,
                snackbarMsg: "Invalid Email..!"
            })
        }else if(this.state.password=== ""){
            this.setState({
                snackbarOpen: true,
                snackbarMsg: "Password cann't be Empty !!"
            })
        }else if (this.state.password.length < 6) {
            this.setState({
                snackbarOpen: true,
                snackbarMsg: "password must be of atleast 6 characters..!!"
            })
        } else if(this.state.email===this.state.Email && this.state.password===this.state.Password){
            this.setState({
                snackbarOpen: true,
                snackbarMsg: "Login Successfully",
                logedIn : true
            })
            localStorage.setItem('Login', true)
            localStorage.setItem('pageLoad', "Y")
            this.props.history.push("/play/instruction");
        }
    }
    
    render() {
        return (
            <Fragment>
         {/**
         * This is use to give browser name of this Application.
         */}
            <Helmet> <title>Quiz App -  Home</title></Helmet>
            <div id='Modal'>
                <section>
                <div style={{ textAlign:"center"}}>
                <img src ={require ('../assets/landingPageIcon.svg')} alt="tpglogo" style={{width:"4rem", textAlign:"center", marginTop:"15px"}}/>
            </div>
                           <h2>Quiz-App-Login</h2>
                                 <div className="input-div">
                             <AccountCircleIcon/>
                               <input type='text' name='username' placeholder='Username' 
                               value={this.state.email} 
                               onChange={(e)=>this.handleEmail(e,"email")}/></div>
                               <div className="input-div">
                                   <LockIcon/>
                               <input className="input-field" type='password' name='password' placeholder='Password' 
                               value={this.state.password} 
                               onChange={(e)=>this.handleEmail(e,"password")}/></div>
                               <div className="singIn-button" onClick={this.handleSubmit}><button> Sign In</button></div>
                             <div className="singIn-button">
                             <Link to="/">Go To Home</Link></div>
                              </section>
                              {/**
                               * This Tag is use to show the Validation error message
                               */}
                              <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.state.snackbarOpen}
                    autoHideDuration={1000}
                    onClose={this.snackbarClose}
                    message={<span id="message-id">{this.state.snackbarMsg}</span>}
                    action={[
                        <IconButton
                            onClick={this.handleClose}
                        >
                            <CloseIcon onClick={this.snackbarClose} />
                        </IconButton>
                    ]}/>
                        </div>
                      </Fragment>
        )
    }
}
/**
 * Make available for another file and folder.
 */
export default Login





