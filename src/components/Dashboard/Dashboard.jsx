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
          console.log(result)
        })
  }

  render(){

    return(
    	<div>
		      <button onClick={this.handleCreateClick}>Create a New Game</button>
	    </div>
    )
  }

}

export default Dashboard;