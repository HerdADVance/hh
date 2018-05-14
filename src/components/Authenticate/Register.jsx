// DEPENDENCIES
import React, { Component } from 'react';

// CSS
import './Register.css';

// COMPONENTS

class Register extends Component{
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    //
  }

  render(){
    return(
      <div>
        <form>
          <label for="username">Username</label>
          <input type="text" id="username" />
          <label for="password">Password</label>
          <input type="password" id="password" />
          <label for="confirm-password">Confirm Password</label>
          <input type="password" id="confirm-password" />
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