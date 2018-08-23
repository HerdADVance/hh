import React, { Component } from 'react';
import axios from 'axios';

// CSS
import './Player.css';

class Player extends Component{
  constructor(props) {
    super(props);
    this.state = {
      chosenCards: [],
      hasPlayed: false
    }
  }

  componentDidMount() {

    // this.setState({
    //   hand: this.props.hand
    //   players: response.data.players
    // })

  }

  handleCardClick(index, playerNumber){
    var chosenCards = this.state.chosenCards

    if(!chosenCards.includes(index)){ // Card was not chosen
      if(chosenCards.length < 2){  // Check to see if card can be chosen
        chosenCards.push(index)
      }
      else{ // Alert that card can't be chosen
        alert("You can only select 2 cards.")
      }
    }
    else{ // Card was already chosen so remove it
      var removeIndex = chosenCards.indexOf(index)
      chosenCards.splice(removeIndex, 1);
    }
    this.setState({ chosenCards: chosenCards })
  }

  submitHand(){
    this.hasPlayed = true
    this.hasOpponentPlayed()
  }

  hasOpponentPlayed(){

  }

  render(){

    const playerNumber = this.props.playerNumber
    const hand = this.props.hand
    const user = this.props.user
    const won = this.props.won
    const isUser = this.props.isUser
    const isOpponent = this.props.isOpponent

    return(
      <div className={`player ${playerNumber}${isUser?' isUser' :''}${isOpponent?' isOpponent' :''}`}>
        <div className="cards">
          {
            isUser?
              hand.map((card, index) => (
                <img
                  key={index}
                  src={"/img/cards/" + card.face + card.suit + ".png"}
                  alt={card.face + card.suit}
                  onClick={() => {
                    this.handleCardClick(index, playerNumber)
                  }}
                  className={this.state.chosenCards.includes(index) && "chosen"}
                />
              ))
            :
              hand.map((card, index) => (
                <img 
                  key={index}
                  src={"/img/cards/back.png"}
                  alt={"back of card"}
                />
              ))
          }
        </div>

        <button
          hidden={this.state.chosenCards.length < 2}
          onClick={() => {
            this.submitHand()
          }}
        >
          Play Hand
        </button>
        
        <div className="user-info">
          <span>{user.displayName} ({won})</span>
        </div>
      </div>
    )
  }
}

export default Player;