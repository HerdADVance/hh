// DEPENDENCIES
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios';

// CSS
import './Authenticate.css';

// COMPONENTS
import Login from './Login';
import Register from './Register';

class Authenticate extends Component{
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/users').then(response => this.setState({users: response.data.user_list}));  
  }

  showLoginForm = () => {
    this.setState({login: true});
  }

  showRegisterForm = () => {
    this.setState({login: false});
  }

  render(){

    const login = this.state.login;
    return(

      <div className="Authenticate inner-wrap">
        {
          login?
            <Login triggerParentUpdate={this.showRegisterForm} />
          :
            <Register triggerParentUpdate={this.showLoginForm} />
        }
        {this.state.users.map(user => 
          <div>{user.displayName}</div>
        )}
      </div>
    )
  }
}

export default Authenticate;