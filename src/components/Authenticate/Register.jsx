// DEPENDENCIES
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios';

// API CALLS
import {create} from '../../api/user-api.js'

// CSS
import './Register.css';


// COMPONENTS

class Register extends Component{
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '', 
      displayName: '',
      returnedUserId: false
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
    this.setState({passwordConfirm: e.target.value});
  }
  handleDisplayNameChange = (e) => {
    this.setState({displayName: e.target.value});
  }
  handleRegisterSubmit = (e) =>{

    e.preventDefault()
    
    //const user = this.state

    // create(user).then((data) => {
    //   if (data.error) {
    //     //this.setState({error: data.error})
    //   } else {
    //       //this.setState({error: '', open: true})
    //       console.log(data);
    //   }
    // })

    axios.post('http://localhost:5000/api/users/new', this.state)
        .then((result) => {
          console.log(result.data)
          this.setState({ 
            returnedUserId: result.data.userId,
          })
        })

  }

  render(){
    const returnedUserId = this.state.returnedUserId;

    return(
      <div className="auth-box">
        {
          returnedUserId?
            <Redirect to={"/user/" + returnedUserId} />
          :
          null
        }
        <p className="auth-switch">
          <a href="#" onClick={this.props.triggerParentUpdate}>Login</a>
        </p>
        <form onSubmit={this.handleRegisterSubmit} >
          <label htmlFor="username">Username</label>
          <input type="text" id="username" onChange={this.handleUsernameChange} />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" onChange={this.handlePasswordChange} />
          <label htmlFor="password-confirm">Confirm Password</label>
          <input type="password" id="password-confirm" onChange={this.handlePasswordConfirmChange} />
          <label htmlFor="display">Display Name</label>
          <input type="text" id="display-name" onChange={this.handleDisplayNameChange} />
          <input type="submit" value="Register" />
        </form>
      </div>
    )
  }
}

export default Register;