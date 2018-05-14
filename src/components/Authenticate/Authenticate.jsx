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
    //this.shuffle(this.state.deck);
  }

  render(){
    return(
      <div className="Authenticate inner-wrap">
        <Login />
      </div>
    )
  }
}

export default Authenticate;