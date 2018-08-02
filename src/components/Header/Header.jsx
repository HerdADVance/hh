// DEPENDENCIES
import React, { Component } from 'react';

// CSS
import './Header.css';

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
      <div className="Header wrap">
          <a href="/" className="logo no-underline"></a>
      </div>
    );
  }
}

export default Header;
