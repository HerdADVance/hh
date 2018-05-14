// DEPENDENCIES
import React, { Component } from 'react';

// CSS
import './Login.css';

// COMPONENTS
import DECK from '../../constants/Deck';
import PlayerOne from '../Player/Player';
import PlayerTwo from '../Player/Player';

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
	    <form>
	      <label for="username">Username</label>
	      <input type="text" id="username" />
	      <label for="password">Password</label>
	      <input type="password" id="password" />
	      <input type="submit" value="Login" />
	    </form>
    )
  }
}

export default Authenticate;