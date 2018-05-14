// DEPENDENCIES
import React, { Component } from 'react';

// CSS
import './Authenticate.css';

// COMPONENTS
import Login from './Login';
import Register from './Register';

class Authenticate extends Component{
  constructor(props) {
    super(props);
    this.state = {
      login: true
    }
  }

  componentDidMount() {
    //
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
            <Login login={true} triggerParentUpdate={this.showRegisterForm} />
          :
            <Register login={false} triggerParentUpdate={this.showLoginForm} />
        }
      </div>
    )
  }
}

export default Authenticate;