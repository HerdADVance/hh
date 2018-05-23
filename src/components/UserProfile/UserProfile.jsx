// DEPENDENCIES
import React, { Component } from 'react';
import axios from 'axios';

// CSS
import './UserProfile.css';

// COMPONENTS

class UserProfile extends Component{
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    //axios.get('http://localhost:5000/users').then(response => this.setState({users: response.data.user_list}));   
  }

  render(){
    const login = this.state.login;
    return(
      <div className="UserProfile inner-wrap">
        <h1>User Profile</h1>
      </div>
    )
  }
}

export default UserProfile;