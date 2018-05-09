// DEPENDENCIES
//import subscribeToTimer from './api'; 
import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

// CSS
import './App.css';

// CONSTANTS
//import DECK from './constants/Deck';

// COMPONENTS
import Game from './components/Game/Game';
//import PlayerOne from './components/Player/Player';
//import PlayerTwo from './components/Player/Player';


// APP
class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activePlace: 0,
      clicked: false,
      timestamp: 'None yet',
      response: false,
      endpoint: "http://localhost:5000"
    };
    
    // subscribeToTimer((err, timestamp) => this.setState({
    //   timestamp
    // }));
  }

  componentDidMount(){
    const {endpoint} = this.state;
    //const socket = socketIOClient(endpoint);
    //socket.on("FromAPI", data => this.setState({ response: data}));
  }

  render() {
    const activePlace = this.state.activePlace;
    const clicked = this.state.clicked
    const {response} = this.state;

    return (
      <div className="App">
          {/*<p>
            This is the timer value: {this.state.timestamp}
          </p>
          {response
          ? <p>
              The temperature in Huntington is: {response} °F
            </p>
          : <p>Loading...</p>}*/}
          <Game />
      </div>
    );
  }
}

export default App;
