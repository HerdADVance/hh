// DEPENDENCIES
import React, { Component } from 'react';

// CSS
import './Login.css';

// COMPONENTS

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
  handleFormSubmit = (e) =>{
    e.preventDefault();
    console.log(this.state);
  }

  render(){
    return(
    	<div>
		    <form onSubmit={this.handleFormSubmit}>
		      <label htmlFor="username">Username</label>
		      <input type="text" id="username" onChange={this.handleUsernameChange}/>
		      <label htmlFor="password">Password</label>
		      <input type="password" id="password" onChange={this.handlePasswordChange} />
		      <input type="submit" value="Login" />
		    </form>
		    <p>
		    	<a href="#" onClick={this.props.triggerParentUpdate}>Register</a>
		    </p>
	    </div>
    )
  }
}

export default Login;