// DEPENDENCIES
import React, { Component } from 'react';

// CSS
import './Footer.css';

// CONSTANTS

// COMPONENTS

// APP
class Footer extends Component {
  
  state = {
    response: ''
  }

  componentDidMount(){
  }

  render() {
    return (
      <div className="Footer wrap">
          <p>&copy; 2018 Savage Industries</p>
      </div>
    );
  }
}

export default Footer;
