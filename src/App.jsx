// DEPENDENCIES
//import subscribeToTimer from './api'; 
import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

// CSS
import './fonts.css';
import './normalize.css';
import './App.css';


// CONSTANTS
//import DECK from './constants/Deck';

// COMPONENTS
import Header from './components/Header/Header'
import Authenticate from './components/Authenticate/Authenticate'
import auth from './components/Authenticate/authenticate-helper'
import PrivateRoute from './components/Authenticate/authenticate-private-route'
import UserProfile from './components/UserProfile/UserProfile'
import Dashboard from './components/Dashboard/Dashboard'
import Game from './components/Game/Game'
import PlayerOne from './components/Player/Player'
import PlayerTwo from './components/Player/Player'
import Footer from './components/Footer/Footer'

// ROUTER
//import routes from './routes/routes';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

// APP
class App extends Component {
  
  state = {
    response: false,
    endpoint: 'http://localhost:5000',
    color: 'blue'
  }

  sendSocket = (color) => {
    const socket = socketIOClient(this.state.endpoint)
    socket.emit('change color', color)
  }

  componentDidMount(){
    // const socket = socketIOClient(this.state.endpoint)

    // socket.on('change color', (color) => {
    //   console.log("receiving " + color + " from server")
    //   this.setState({color: color})
    // })
  }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if(response.status !== 200) throw Error(body.message);

  //   return body;
  // }

  render() {

    const {response} = this.state

    return (
      <BrowserRouter>
        <div className="App">
            <Header />
            <div className="main" style={{background: this.state.color}}>
              <button onClick={() => this.sendSocket('blue')}>Change to Blue</button>
              <button onClick={() => this.sendSocket('red')}>Change to Red</button>
              <Switch>
                <Route exact path="/login" component={Authenticate}/>
                <PrivateRoute exact path="/" component={Dashboard} />
                <Route exact path="/game/:id" component={Game}/>
                <Route path="/user/:id" component={UserProfile}/>
              </Switch>
            </div>
            <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
