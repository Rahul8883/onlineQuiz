import React, { Component,  Fragment} from "react";
import { withRouter } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Helmet from "react-helmet"; 
export class Registeration extends Component {

    /**
     * 
     * @param {props} Property The component receives the argument as a props object. 
     */

    constructor(props){
        super(props)
      this.state = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatPassword: "",
        register_data: [],
      };  
    }

    /**
     *The componentWillMount() is a chance for us to handle configuration,
       update our state, and in general prepare for the first render.
       At this point, props and initial state are defined.
     */

  componentDidMount() {
    ValidatorForm.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false;
      }
      return true;
    });
  }

  componentWillUnmount() {
    ValidatorForm.removeValidationRule("isPasswordMatch");
  }

  handlerField = (event, value) => {
      this.setState({[value] : event.target.value});
  }
  
  /**
   * After Compleate validation, this handler is use to submit the All user details and make access to main Quiz page and set the data in localStorage.
   */

  handleRegisterSubmit = () => {
    let _register = {
      firstName: this.state.firstName,
      lastName: this.state.lastName, 
      email: this.state.email,
      password: this.state.password,
      confirm_password: this.state.repeatPassword,
      passcode : this.state.passCode
    };
    this.state.register_data.push(_register);
    let student_data = JSON.stringify(this.state.register_data);
      localStorage.setItem('Confirm Your Details', student_data);
      localStorage.setItem('email', this.state.email)
      localStorage.setItem('password', this.state.password)
    this.props.history.replace("/login");
  }

  handleHome=()=>{
    this.props.history.push('/')
  }

  render() {
    return (
        <Fragment>
       {/**
         * This is use to give browser name of this Application.
         */}
        <Helmet> <title>Quiz App -  Registration</title></Helmet>

        <div id="home_">
        <section>
            <div style={{ textAlign:"center"}}>
                <img src ={require ('../assets/landingPageIcon.svg')} alt="tpglogo" style={{width:"5rem", textAlign:"center", marginBottom:"1rem", marginTop:"1rem"}}/>
            </div>
            <h1>Quiz App</h1>
            <div className="play-button-container"></div>
            <div className="whole_card">
                  <div className="all_field">
                    <ValidatorForm onSubmit={this.handleRegisterSubmit}>
                      <div className="field">
                        <TextValidator
                          label="First name"
                          onChange={(e)=>this.handlerField(e, "firstName")}
                          name="firstName"
                          type="firstName"
                          variant="outlined"
                          fullWidth
                          validators={["required"]}
                          errorMessages={["this field is required"]}
                          value={this.state.firstName}/>
                      </div>
                      <div className="field">
                        <TextValidator
                          label="Last name"
                          onChange={(e)=>this.handlerField(e, "lastName")}
                          name="lastName"
                          type="lastName"
                          variant="outlined"
                          fullWidth
                          validators={["required"]}
                          errorMessages={["this field is required"]}
                          value={this.state.lastName} />
                      </div>
                      <div className="field">
                        <TextValidator
                          className="field"
                          label="Email"
                          onChange={(e)=>this.handlerField(e, "email")}
                          name="email"
                          variant="outlined"
                          fullWidth
                          value={this.state.email}
                          validators={["required", "isEmail"]}
                          errorMessages={[ "this field is required","email is not valid" ]}/>
                      </div>
                      <div className="field">
                        <TextValidator
                          className="field"
                          label="Password"
                          onChange={(e)=>this.handlerField(e, "password")}
                          name="password"
                          type="password"
                          variant="outlined"
                          fullWidth
                          validators={["required"]}
                          errorMessages={["this field is required"]}
                          value={this.state.password} />
                      </div>
                      <div className="field">
                        <TextValidator
                          className="field"
                          label="Repeat password"
                          onChange={(e)=>this.handlerField(e,"repeatPassword")}
                          name="repeatPassword"
                          type="password"
                          variant="outlined"
                          fullWidth
                          validators={["isPasswordMatch", "required"]}
                          errorMessages={["password mismatch", "this field is required" ]}
                          value={this.state.repeatPassword} />
                      </div>
                      <div className="p-buuton">
                      <button
                      //  fullWidth
                       type="submit" className="play-button_" style={{borderStyle: "none", border: "2px solid",
                          background: "bottom"}}>Register</button>
                      <button className="home_" onClick={this.handleHome}>Home</button>
        </div>
                    </ValidatorForm>
                  </div>
            </div>
            </section>
            </div>
      
     </Fragment> 
    );
  }
}
/**
 * Make available for another file and folder.
 */
export default withRouter(Registeration);
