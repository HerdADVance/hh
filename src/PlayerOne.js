import React, { Component } from 'react';

class PlayerOne extends Component{
  constructor(props) {
    super(props);
    this.state = {
      chosenCards: [],
      hasPlayed: false
    }
  }

  componentDidMount() {
    console.log("MOUNTED");
  }

  handleCardClick(index){
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
    const hand = this.props.hand
    console.log(hand);
    return(
      <div className="player">
        <div className="cards p1">
          {hand.map((card, index) => (
            <img
              key={index}
              src={"/img/cards/" + card.face + card.suit + ".png"}
              alt="Card"
              onClick={() => {
                this.handleCardClick(index)
              }}
              className={this.state.chosenCards.includes(index) && "chosen"}
            />
          ))}
        </div>
        <button
          hidden={this.state.chosenCards.length < 2}
          onClick={() => {
            this.submitHand()
          }}
        >
          Play Hand
        </button>
      </div>
    )
  }
}

export default PlayerOne;