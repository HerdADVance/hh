// DEPENDENCIES
import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'

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

  handleCreateClick = (e) =>{
    e.preventDefault();
    const userId = JSON.parse(sessionStorage.getItem('jwt')).user._id
    axios.post('http://localhost:5000/api/game/join', {userId: userId})
        .then((result) => {
          this.setState({canStartGame: false})
          console.log(result.data.message)
        })
  }

  render(){
    const canStartGame = this.state.canStartGame
    return(
    	<div className="main-wrap">
        <div className="dash-column">
          <h1>Games</h1>
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