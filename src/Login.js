import React from 'react'
import * as actions from "./store/actions/index";
import {
  Form,
  Input,
} from "reactstrap";
import { connect } from "react-redux";
import { withSnackbar } from "notistack";
import { Provider } from 'react-redux'
import { Redirect } from "react-router-dom";
import { parsePhoneNumber, isValidPhoneNumber } from "react-phone-number-input";
const Dashboard = React.lazy(() => import("./Dashboard.js"));

class Home extends React.Component {
  
  state = {
    formvalues: { email: '', password: '',country_code:'+91',user_type:'professional' },
    // formvalidation: { email: '', password: '',country_code:'+91',user_type:'professional' },
    FormFields: { email: '', password: '',country_code:'+91',user_type:'professional' },
    formErrors: { email: '', password: '',country_code:'+91',user_type:'professional' },
  };
  
  formValid = ({ formErrors, ...rest }) => {
    console.log(formErrors)
    let valid = true;
    // validate form errors being empty
    // Object.values(formErrors).forEach(val => {
    //   val.length > 0 && (valid = false);
    // });

    Object.entries(rest).forEach(([key, val]) => {
      
      if (
        ![
          "email",
          "password",
          "country_code",
          "user_type"
        ].includes(key) &&
        (val === null || val === "")
      ) {
        formErrors[key] = "This field is required";

        valid = false;
      }
    });
    console.log(formErrors);
    this.setState({ formErrors });
    return valid;
  };
  submitHandler(event){
    event.preventDefault();
    if (!this.formValid(this.state)) {
      return false
    }
    this.props.onAuth(this.state.formvalues)
  };
  handleChange(e){
    const form = { ...this.state.formvalues }
    const { name, value } = e.target;
    let formErrors = this.state.formErrors;

      switch (name) {
        case "email":
          formErrors.email =
            value.length < 3 ? "minimum 3 characters required" : "";
          break;
        case "password":
          formErrors.password =
            value.length < 3 ? "minimum 3 characters required" : "";
          break;
        case "country_code":
          formErrors.country_code = value.length < 3 ? "minimum 3 characters required" : "";
          break;
        case "bname":
          formErrors.user_type = value.length < 3 ? "minimum 3 characters required" : "";
          break;
        default:
          break;
      }

    form[e.target.name] = e.target.value
    this.setState({
      formvalues:form,
    })
    
  }
  componentDidUpdate(prevProps, prevState) {
    const { enqueueSnackbar, error, success } = this.props;
    success && enqueueSnackbar(success, { variant: "success" });
    error && enqueueSnackbar(error, { variant: "error" });
  }
  
  render () {
    const { formErrors } = this.state.formvalues;
    const userToken = localStorage.getItem('token')
    // console.log(userToken)
    let authRedirect = null
    if (userToken) { 
      authRedirect = <Redirect from="/" to= "./Dashboard"/>
    }
    return (
      <div className='main-content'>
        {authRedirect}
        <div className='header bg-gradient-primary py-7 py-lg-8 pt-lg-9' />
        <div className='container mt--8 pb-5'>
          <div className='row justify-content-center'>
            <div className='col-lg-5 col-md-7'>
              <div className='card bg-secondary border-0 mb-0'>
                <div className='card-header bg-transparent text-center'>
                  <img src='../assets/img/logo.png' style={{ height: 65 }} />
                </div>
                <div className='card-body px-lg-5 py-lg-5'>
                  <div className='text-center text-muted mb-4'>
                    <small>Sign in with credentials</small>
                  </div>
                  <Form role='form' onSubmit={(event) => this.submitHandler(event)}>
                    <div className='form-group mb-3'>
                      <div className='input-group input-group-merge input-group-alternative'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'><i className='ni ni-email-83' /></span>
                        </div>
                        <Input
                          className='form-control' 
                          tabindex='1'
                          type='text'
                          name='email' 
                          id='email' 
                          placeholder='Mobile no' 
                          maxlength='60' 
                          onChange={(event) => this.handleChange(event)}
                          value={this.state.formvalues.email}
                        />
                          {((formErrors != undefined) &&(formErrors.email.length > 0)) && (
                          <span className="input-group-text">
                            {formErrors.email}
                          </span>
                          )}
                      </div>
                    </div>
                    <div className='form-group'>
                      <div className='input-group input-group-merge input-group-alternative'>
                        <div className='input-group-prepend'>
                          <span className='input-group-text'><i className='ni ni-lock-circle-open' /></span>
                        </div>
                        <Input 
                          className='form-control'  
                          placeholder='Password' 
                          type='password' 
                          name='password' 
                          id='password'
                          onChange={(event) => this.handleChange(event)}
                          value={this.state.formvalues.password}
                        />
                        {(formErrors != undefined) && (formErrors.password.length > 0) && (
                        <span className="invalid-feedback invalid-feedback">
                          {formErrors.password}
                        </span>
                        )}
                      </div>
                    </div>
                    <div className='row mt-3'>
                      <div className='col-6'>
                        <div className='custom-control custom-control-alternative custom-checkbox'>
                          <input className='custom-control-input' id=' customCheckLogin' type='checkbox' />
                          <label className='custom-control-label' for=' customCheckLogin'>
                            <span className='text-muted'>Remember me</span>
                          </label>
                        </div>
                      </div>
                      <div className='col-6 text-right'>
                        <a href='#' className='text-muted'><small>Forgot password?</small></a>
                      </div>
                    </div>

                    <div className='text-center'>
                      {/* <Link to='/dashboard'> */}
                        <button type='button' className='btn btn-primary my-4' onClick={(event) => this.submitHandler(event)}>Sign in</button>
                        {/* <Button type='button' className='btn btn-primary my-4'>Sign in</Button> */}
                      {/* </Link> */}
                    </div>
                  </Form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    )
  }
}
const mapPropsToState = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (data) => dispatch(actions.auth(data))
  };
};

export default connect(
  mapPropsToState,
  mapDispatchToProps
)(withSnackbar(Home));

// export default Home
