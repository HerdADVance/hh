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
      canStartGame: true,
      redirect: false,
      modal: false,
      newGameId: false,
      games: [

      ]
    }
  }

  componentDidMount = () => {
    const userId = JSON.parse(sessionStorage.getItem('jwt')).user._id
      axios.post('http://localhost:5000/api/users/games/', {userId: userId})
        .then((result) => {
          console.log(result.data.user_games)
          // this.setState({
          //   games: result.data.games
          // })
        }) 
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

  handlePlayRandomOpponentClick = (e) =>{
    e.preventDefault();
    const userId = JSON.parse(sessionStorage.getItem('jwt')).user._id
    axios.post('http://localhost:5000/api/game/join', {userId: userId})
        .then((result) => {
          this.setState({
            canStartGame: false, 
            modal:{
              modalMessage: result.data.modalMessage,
              buttonMessage: result.data.buttonMessage
            },
            newGameId: result.data.newGameId
          })
        })
  }

  handleGameClick = () => {
    console.log("Game clicked")
  }

  handleModalClick = () => {
    this.setState({
      modal: false,
      redirect: '/game/' + this.state.newGameId
    })
  }

  render(){

    const {redirect} = this.state
    if (redirect) {
      return (<Redirect to={redirect}/>)
    }

    const canStartGame = this.state.canStartGame
    const modal = this.state.modal

    const games = this.state.games

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
                <td>{games}</td>
                <td>2-2</td>
                <td>View</td>
              </tr>
            </tbody>
          </table>
          <button onClick={this.handlePlayRandomOpponentClick}>
            {
              canStartGame?
                "Play Random Opponent"
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

        {
          modal?
            <div className="modal-bg">
              <div className="modal">
                <p>{modal.modalMessage}</p>
                <button onClick={this.handleModalClick}>{modal.buttonMessage}</button>
              </div>
            </div>
          :
            ''
        }

	    </div>
    )
  }

}

export default Dashboard;