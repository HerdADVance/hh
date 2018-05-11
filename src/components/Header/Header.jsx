// DEPENDENCIES
import React, { Component } from 'react';

// CSS

// CONSTANTS

// COMPONENTS

// APP
class Header extends Component {
  
  state = {
    response: ''
  }

  componentDidMount(){
  }

  render() {
    return (
      <div className="Header">
          <a href="/">Huntington Hold'em</a>
      </div>
    );
  }
}

export default Header;
