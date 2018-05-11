// DEPENDENCIES
import React, { Component } from 'react';

// CSS
import './Authenticate.css';

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
      <div className="Authenticate">
        <form>
          <input type="text" placeholder="username" />
          <input type="password" placeholder="password" />
          <input type="submit" value="Login" />
        </form>
      </div>
    )
  }
}

export default Authenticate;