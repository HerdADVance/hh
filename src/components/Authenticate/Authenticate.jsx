// DEPENDENCIES
import React, { Component } from 'react';

// CSS
import './Authenticate.css';

// COMPONENTS
import Login from './Login';

class Authenticate extends Component{
  constructor(props) {
    super(props);
    this.state = {
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