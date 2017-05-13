import React, { Component } from 'react';
import './App.css';

const DECK = [
  { rank: 2, face: '2', suit: 'C'},
  { rank: 3, face: '3', suit: 'C'},
  { rank: 4, face: '4', suit: 'C'},
  { rank: 5, face: '5', suit: 'C'},
  { rank: 6, face: '6', suit: 'C'},
  { rank: 7, face: '7', suit: 'C'},
  { rank: 8, face: '8', suit: 'C'},
  { rank: 9, face: '9', suit: 'C'},
  { rank: 10, face: 'T', suit: 'C'},
  { rank: 11, face: 'J', suit: 'C'},
  { rank: 12, face: 'Q', suit: 'C'},
  { rank: 13, face: 'K', suit: 'C'},
  { rank: 14, face: 'A', suit: 'C'},
  { rank: 2, face: '2', suit: 'D'},
  { rank: 3, face: '3', suit: 'D'},
  { rank: 4, face: '4', suit: 'D'},
  { rank: 5, face: '5', suit: 'D'},
  { rank: 6, face: '6', suit: 'D'},
  { rank: 7, face: '7', suit: 'D'},
  { rank: 8, face: '8', suit: 'D'},
  { rank: 9, face: '9', suit: 'D'},
  { rank: 10, face: 'T', suit: 'D'},
  { rank: 11, face: 'J', suit: 'D'},
  { rank: 12, face: 'Q', suit: 'D'},
  { rank: 13, face: 'K', suit: 'D'},
  { rank: 14, face: 'A', suit: 'D'},
  { rank: 2, face: '2', suit: 'H'},
  { rank: 3, face: '3', suit: 'H'},
  { rank: 4, face: '4', suit: 'H'},
  { rank: 5, face: '5', suit: 'H'},
  { rank: 6, face: '6', suit: 'H'},
  { rank: 7, face: '7', suit: 'H'},
  { rank: 8, face: '8', suit: 'H'},
  { rank: 9, face: '9', suit: 'H'},
  { rank: 10, face: 'T', suit: 'H'},
  { rank: 11, face: 'J', suit: 'H'},
  { rank: 12, face: 'Q', suit: 'H'},
  { rank: 13, face: 'K', suit: 'H'},
  { rank: 14, face: 'A', suit: 'H'},
  { rank: 2, face: '2', suit: 'S'},
  { rank: 3, face: '3', suit: 'S'},
  { rank: 4, face: '4', suit: 'S'},
  { rank: 5, face: '5', suit: 'S'},
  { rank: 6, face: '6', suit: 'S'},
  { rank: 7, face: '7', suit: 'S'},
  { rank: 8, face: '8', suit: 'S'},
  { rank: 9, face: '9', suit: 'S'},
  { rank: 10, face: 'T', suit: 'S'},
  { rank: 11, face: 'J', suit: 'S'},
  { rank: 12, face: 'Q', suit: 'S'},
  { rank: 13, face: 'K', suit: 'S'},
  { rank: 14, face: 'A', suit: 'S'}
]

class WeatherDisplay extends Component{

  constructor(props) {
    super(props);
    this.state = {
      weatherData: null
    }
  }

  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial"; 
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({ weatherData: json});
    })
  }

  render(){
    const weatherData = this.state.weatherData;

    if (!weatherData) return <div>Loading...</div>;
    
    const weather = weatherData.weather[0];
    const iconURL = "http://openweathermap.org/img/w/" + weather.icon + ".png";

    return(
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src={iconURL} alt={weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}&deg;</p>
        <p>High: {weatherData.main.temp_max}&deg;</p>
        <p>Low: {weatherData.main.temp_min}&deg;</p>
        <p>Wind Speed: {weatherData.wind.speed} mi/hr</p>
      </div>
    )
  }
}

// class Hand extends Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       hand: 7,
//     }
//   }

//   componentDidMount() {
//     const hand = this.props.hand
//   }
// }

class PlayerOne extends Component{
  constructor(props) {
    super(props);
    this.state = {
      chosenCards: [],
      chosenCardsNumber: 0
    }
  }

  componentDidMount() {
    //const hand = [7,7,7]
    //const cards = []
  }

  handleCardClick(index){
    console.log(index)
    var chosenCards = this.state.chosenCards

    if(!chosenCards.includes(index)){
      if(chosenCards.length < 2){
        chosenCards.push(index)
      }
      else{
        alert("You can only select 2 cards.")
      }
    }
    else{
      var removeIndex = chosenCards.indexOf(index)
      chosenCards.splice(removeIndex, 1);
    }
    console.log(chosenCards)
    this.setState({ chosenCards: chosenCards })
  }

  render(){
    const hand = this.props.hand
    return(
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
    )
  }
}

class PlayerTwo extends Component{
  constructor(props) {
    super(props);
    this.state = {
      hand: 7,
    }
  }

  componentDidMount() {
    //const hand = [7,7,7]
    //const cards = []
  }

  render(){
    const hand = this.props.hand
    return(
      <div className="cards p2">
        {hand.map((card, index) => (
          <img
            key={index}
            src={"/img/cards/" + card.face + card.suit + ".png"}
            alt="Card"
          />
        ))}
      </div>
    )
  }
}

class Game extends Component{
  constructor(props) {
    super(props);
    this.state = {
      round: 1,
      deck: DECK,
      playerOneHand: [],
      playerTwoHand: []
    }
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
      
      if(count % 2 == 0 ) playerOneHand.push(deck[0]);
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

  componentDidMount() {
    this.shuffle(this.state.deck);
    this.dealCards(this.state.deck);
  }

  render(){
    return(
      <div>
        <PlayerOne 
          hand={this.state.playerOneHand}
        />
        <PlayerTwo
          hand={this.state.playerTwoHand}
        />
        <div className="cards flop">
          <img src={"/img/cards/" + this.state.deck[20].face + this.state.deck[20].suit + ".png"} />
          <img src={"/img/cards/" + this.state.deck[21].face + this.state.deck[21].suit + ".png"} />
          <img src={"/img/cards/" + this.state.deck[22].face + this.state.deck[22].suit + ".png"} />
          <img src={"/img/cards/" + this.state.deck[23].face + this.state.deck[23].suit + ".png"} />
          <img src={"/img/cards/" + this.state.deck[24].face + this.state.deck[24].suit + ".png"} />
        </div>
      </div>
    )
  }
}


class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      activePlace: 0,
      clicked: false
    };
  }

  render() {
    const activePlace = this.state.activePlace;
    const clicked = this.state.clicked

    return (
      <div className="App">
          
          <Game />

      </div>
    );
  }
}

export default App;
