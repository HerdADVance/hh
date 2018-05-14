// DEPENDENCIES
import React, { Component } from 'react';

// CSS
import './Login.css';

// COMPONENTS

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    //this.shuffle(this.state.deck);
  }

  handleRegisterClick(){
  	alert("HEY");
  }

  render(){
    return(
    	<div>
		    <form>
		      <label for="username">Username</label>
		      <input type="text" id="username" />
		      <label for="password">Password</label>
		      <input type="password" id="password" />
		      <input type="submit" value="Login" />
		    </form>
		    <p>
		    	<a href="#" onClick={this.handleRegisterClick}>Register</a>
		    </p>
	    </div>
    )
  }
}

export default Login;