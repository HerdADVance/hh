// DEPENDENCIES
import React, { Component } from 'react';

// CSS
import './Login.css';

// COMPONENTS

class Login extends Component{
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
    }
  }

  componentDidMount() {
    //
  }

  handleFormSubmit(){
    alert("submitted");
  }

  render(){
    return(
    	<div>
		    <form onSubmit={this.handleFormSubmit}>
		      <label htmlFor="username">Username</label>
		      <input type="text" id="username" />
		      <label htmlFor="password">Password</label>
		      <input type="password" id="password" />
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