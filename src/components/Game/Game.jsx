// DEPENDENCIES
import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom'

// CSS
import './Game.css';

// COMPONENTS
import DECK from '../../constants/Deck';
import PlayerOne from '../Player/Player';
import PlayerTwo from '../Player/Player';

class Game extends Component{
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      flop: [],
      players: []
    }
  }

  componentDidMount() {
    this.shuffle(this.state.deck);
    this.dealCards(this.state.deck);
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
    return(
      <div className="main">
        {/*<PlayerOne 
          hand={this.state.playerOneHand}
          playerNumber="p1"
        />*/}
        <PlayerTwo
          hand={this.state.playerTwoHand}
          playerNumber="p2"
        />
        <div className="cards flop">
          <img src={"/img/cards/" + this.state.deck[20].face + this.state.deck[20].suit + ".png"} alt={this.state.deck[20].face + this.state.deck[20].suit}/>
          <img src={"/img/cards/" + this.state.deck[21].face + this.state.deck[21].suit + ".png"} alt={this.state.deck[21].face + this.state.deck[21].suit}/>
          <img src={"/img/cards/" + this.state.deck[22].face + this.state.deck[22].suit + ".png"} alt={this.state.deck[22].face + this.state.deck[22].suit}/>
          <img src={"/img/cards/" + this.state.deck[23].face + this.state.deck[23].suit + ".png"} alt={this.state.deck[23].face + this.state.deck[23].suit}/>
          <img src={"/img/cards/" + this.state.deck[24].face + this.state.deck[24].suit + ".png"} alt={this.state.deck[24].face + this.state.deck[24].suit}/>
        </div>
      </div>
    )
  }
}

export default Game;