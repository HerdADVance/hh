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

    var userId = this.props.match.params.id;

    axios.get('http://localhost:5000/api/user/' + userId).then(response =>{
      console.log(response.data);
      this.setState({ user: response.data.user });
    });

  }

  render(){
    const login = this.state.login;
    return(
      <div className="UserProfile inner-wrap">
        <h1>{this.state.user.displayName}</h1>
      </div>
    )
  }
}

export default UserProfile;