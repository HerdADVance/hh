// DEPENDENCIES
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import socketIOClient from 'socket.io-client'

// CSS
import './Dashboard.css';

// COMPONENTS

class Dashboard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      canStartGame: true
    }
  }

  componentDidMount = () => {
       
  }

  // const manager = new io.Manager(
  //   'http://localhost:7777',
  //   {path: '/socket.io'}
  // );

  // const namespace = {
  //   home: manager.socket('/home'),
  //   login: manager.socket('/login'),
  //   logout: manager.socket('/logout')
  // };

  // namespace.home.on('welcome', (msg) => {
  //   console.log("WELCOME");
  //   title.textContent = msg;
  //   error.textContent = '';
  // });

  handleCreateClick = (e) =>{
    e.preventDefault();
    const userId = JSON.parse(sessionStorage.getItem('jwt')).user._id
    axios.post('http://localhost:5000/api/game/join', {userId: userId})
        .then((result) => {
          this.setState({canStartGame: false})
          console.log(result.data.message)
        })
  }

  handleGameClick = () => {
    console.log("Game clicked")
  }

  render(){
    const canStartGame = this.state.canStartGame
    return(
    	<div className="main-wrap">
        <div className="dash-column">
          <h1>Games</h1>
          <table className="games">
            <thead>
              <tr>
                <th>Opponent</th>
                <th>Status</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr onClick={this.handleGameClick}>
                <td>brasky645</td>
                <td>1-2</td>
                <td>View</td>
              </tr>
              <tr>
                <td>ballsoherd</td>
                <td>1-0-1</td>
                <td>View</td>
              </tr>
              <tr>
                <td>herdadvance</td>
                <td>2-2</td>
                <td>View</td>
              </tr>
            </tbody>
          </table>
          <button onClick={this.handleCreateClick}>
            {
              canStartGame?
                "Create a Game"
              :
                "Waiting on 2nd player"
            }
          </button>
        </div>
        <div className="dash-column">
          <h1>Friends</h1>
        </div>
        <div className="dash-column">
          <h1>Stats</h1>
        </div>
	    </div>
    )
  }

}

export default Dashboard;