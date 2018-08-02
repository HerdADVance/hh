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
      username: '',
      password: '',
      redirect: false
    }
  }

  componentDidMount = () => {
       
  }

  handleCreateClick = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:5000/api/game/join', {userId: 'userId'})
        .then((result) => {
          console.log(result.data.message)
        })
  }

  render(){

    return(
    	<div className="main-wrap">
        <div className="dash-column">
          <h1>Games</h1>
          <button onClick={this.handleCreateClick}>Create a New Game</button>
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