// DEPENDENCIES
import React, { Component } from 'react';

// CSS
import './Register.css';

// COMPONENTS

class Register extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      confirmPassword: '', 
      displayName: ''
    }
  }

  componentDidMount() {
    //
  }

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value});
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }
  handlePasswordConfirmChange = (e) => {
    this.setState({confirmPassword: e.target.value});
  }
  handleDisplayNameChange = (e) => {
    this.setState({displayName: e.target.value});
  }
  handleFormSubmit = (e) =>{
    e.preventDefault();
    console.log(this.state);
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" onChange={this.handleUsernameChange} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={this.handlePasswordChange} />
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" onChange={this.handlePasswordConfirmChange} />
          <label htmlFor="display">Display Name</label>
          <input type="text" id="display-name" onChange={this.handleDisplayNameChange} />
          <input type="submit" value="Register" />
        </form>
        <p>
          <a href="#" onClick={this.props.triggerParentUpdate}>Login</a>
        </p>
      </div>
    )
  }
}

export default Register;