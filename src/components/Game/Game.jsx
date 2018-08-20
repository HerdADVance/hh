// DEPENDENCIES
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios';

// CSS
import './Game.css';

// COMPONENTS
import PlayerOne from './../Player/Player'
import PlayerTwo from './../Player/Player'

class Game extends Component{
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      boards: [],
      players: []
    }
  }

  componentDidMount() {
    var gameId = this.props.match.params.id;

    axios.post('http://localhost:5000/api/game/' + gameId)
      .then(response => {
          console.log(response)
          this.setState({
            status: response.data.status,
            boards: response.data.boards,
            players: response.data.players
          })
      })
  }

  shuffle(deck){
    var currentIndex = deck.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }
    this.setState({ deck: deck })
  }

  dealCards(deck){
    var playerOneHand = [];
    var playerTwoHand = [];

    var count = 0;
    while(count < 20){
      
      if(count % 2 === 0 ) playerOneHand.push(deck[0]);
      else playerTwoHand.push(deck[0]);

      deck.shift();

      count ++;
    }

    playerOneHand.sort(this.sortByRank);
    playerTwoHand.sort(this.sortByRank);

    this.setState({ playerOneHand: playerOneHand, playerTwoHand: playerTwoHand })
  }

  sortByRank(a,b){
      if (a.rank < b.rank)
        return -1;
      if (a.rank > b.rank)
        return 1;
      return 0;
  }
  sortBySuit(a,b){
      if (a.suit < b.suit)
        return -1;
      if (a.suit > b.suit)
        return 1;
      return 0;
  }

  compareHands(){

  }  

  render(){

    const board = this.state.boards[0]
    const playerOne = this.state.players[0]
    const playerTwo = this.state.players[1]

    return(
      <div className="main">

      {
        playerOne?
          <div>
            <PlayerOne 
              gameId={this.props.match.params.id}
              playerNumber="p1"
              hand={playerOne.hand}
              user={playerOne.user}
              won={playerOne.won}
            />
            <PlayerTwo
              gameId={this.props.match.params.id}
              playerNumber="p2"
              hand={playerTwo.hand}
              user={playerTwo.user}
              won={playerTwo.won}
            />
          </div>
        :
          ''
      }

        <div className="cards flop">
          {
            board?
              board.map((card, index) => (
                <img src={"/img/cards/" + card.face + card.suit + ".png"} alt={card.face + card.suit} key={index}/>
              ))
            :
              ''
          }
          
        </div>
      </div>
    )
  }
}

export default Game;