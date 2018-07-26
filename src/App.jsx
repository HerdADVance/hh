// DEPENDENCIES
//import subscribeToTimer from './api'; 
import React, { Component } from 'react';
import socketIOClient from "socket.io-client";

// CSS
import './App.css';

// CONSTANTS
//import DECK from './constants/Deck';

// COMPONENTS
import Header from './components/Header/Header';
import Authenticate from './components/Authenticate/Authenticate';
import UserProfile from './components/UserProfile/UserProfile';
import Game from './components/Game/Game';
import PlayerOne from './components/Player/Player';
import PlayerTwo from './components/Player/Player';
import Footer from './components/Footer/Footer';

// ROUTER
//import routes from './routes/routes';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'

// APP
class App extends Component {
  
  state = {
    response: ''
  }

  componentDidMount(){
    // this.callApi()
    //   .then(res => this.setState({ response: res.express}))
    //   .catch(err => console.log(err));
  }

  // callApi = async () => {
  //   const response = await fetch('/api/hello');
  //   const body = await response.json();

  //   if(response.status !== 200) throw Error(body.message);

  //   return body;
  // }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
            <Header />
            <div className="main">
              <Switch>
                <Route exact path="/" component={Authenticate}/>
                <Route exact path="/game" component={Game}/>
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
