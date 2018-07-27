// DEPENDENCIES
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

// CSS
import './Login.css';

// COMPONENTS
import auth from './authenticate-helper.js'

class Login extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: false
    }
  }

  componentDidMount = () => {
       
  }

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value});
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }
  handleFormSubmit = (e) =>{
    e.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    axios.post('http://localhost:5000/api/user/login', user)
        .then((result) => {
          auth.authenticate(result.data, () => {
            this.setState({ 
              redirect: '/'
            })
          })
        })
  }

  render(){

    const {redirect} = this.state
    if (redirect) {
      return (<Redirect to={redirect}/>)
    }

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