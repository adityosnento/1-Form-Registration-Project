import React, { Component } from 'react';
import './App.css';

const emailRegex = RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/);

const formValid = formErrors => {
  let valid = true;

  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  return valid;
};

class  App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      formErrors: {
        firstName:"", 
        lastName:"",
        email:"",
        password:""

      }
    }
  }

    handleSubmit = e => {
      e.preventDefault();

      if(formValid(this.state.formErrors)) {
        console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
        `)
      } else {
        console.error('FORM INVALID - DISPLAY ERROR MESSAGE');
         
      }
    }

    handleChange = e => {
      e.preventDefault();
      const {name, value} = e.target;
      let formErrors = {...this.state.formErrors};

      console.log(name);
      console.log("value: ", value.length)


      switch (name) {
        case 'firstName' :
          formErrors.firstName = value.length < 3 ? 'minimum 3 characters required': "";
        break;
        
        case 'lastName' :
          formErrors.lastName = value.length < 3 ? 'minimum 3 characters required': "";
        break;
        
        case 'email' :
          formErrors.email = emailRegex.test(value) ? '': 'invalid email addres';
        break;
        
        case 'password' :
          formErrors.password = value.length < 6 ? 'minimum 6 characters required': "";
        break;
        default:
        break;
      }

      console.log('formerr', formErrors)

      this.setState({
        formErrors
      })
    }

  render(){
    
    console.log(this.state.formErrors)
    const {formErrors} = this.state;
   
    return (
      <div className="wrapper">
        <div className="form-wrapper">
        <h1>Create Account</h1>
        <form onSubmit={this.handleSubmit} noValidate>
          <div className="firstName">
              <label>First Name</label>
              <input type="text" placeholder="First Name" required onChange={this.handleChange}  name="firstName" />
            {formErrors.firstName.length > 0 && (
              <span className="errorMessage">{formErrors.firstName}</span>
            )}
          </div>
          
          <div className="lastName">
            <label>Last Name</label>
            <input type="text" placeholder="Last Name" required onChange={this.handleChange} name="lastName" />
            {formErrors.lastName.length > 0 && (
              <span className="errorMessage">{formErrors.lastName}</span>
            )}
          </div>
          
          <div className="email">
            <label>Email</label>
            <input type="text" placeholder="Email" required onChange={this.handleChange} name="email" />
            {formErrors.email.length > 0 && (
              <span className="errorMessage">{formErrors.email}</span>
            )}
          </div>
          
          <div className="password">
            <label>Password</label>
            <input type="password" placeholder="Password" required onChange={this.handleChange} name="password" />
            {formErrors.password.length > 0 && (
              <span className="errorMessage">{formErrors.password}</span>
            )}
          </div>
          
          <div className="createAccount">
            <button type="submit">Create Account</button>
            <small>Already Have an Account?</small>
          </div>
        </form>
        </div>
      </div>
    );
  }
  
}

export default App;
