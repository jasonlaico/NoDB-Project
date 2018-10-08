import React, { Component } from "react";
var NumberFormat = require('react-number-format');

export default class Cointicker extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        name: this.cointicker,
        userInput: '',
        filteredCoins: []};
    this.handleCoinInput = this.handleCoinInput.bind(this);
    console.log(this.prop)

  }
// componentDidMount(){
//   let{filteredCoins}=this.state
//   filteredCoins.push(this.props.state.cointicker)
//   console.log(this.props)
//     this.setState({filteredCoins: this.props.state.cointicker})
//     console.log (filteredCoins)
// }
  handleCoinInput(e) {
    this.setState({ name: e.target.value });
  }


  handleChange(val) {
    this.setState({ userInput: val });
  }

  filterCoins(userInput) {
    console.log(userInput)
    var coins = userInput;
    var filteredCoins2 = this.props.state.cointicker;
    var match= [];
console.log(filteredCoins2)
    for (var key in filteredCoins2) {

console.log(filteredCoins2[key].name)

      if (filteredCoins2[key].name.includes(coins ) ) {
         console.log(filteredCoins2[key])
         match.push(filteredCoins2[key] )
      }
    }

    this.setState({ filteredCoins: match});
  }
  
  render() {
    

    return (
      <div className="boxx">
        <h4> Get price info on any coin! </h4>
        <span className="entryText"> Coin Name: { JSON.stringify(this.state.coins, null, 10) } </span>
        <input className="inputLine" placeholder="Ex: Dogecoin" onChange={ (e) => this.handleChange(e.target.value) }></input>
        <button className="confirmationButton" onClick={ 
            () => this.filterCoins(this.state.userInput)
             }> Get price now! </button>
        <span className="resultsBox filterStringRB"> <br></br>Live USD price: { 
        
       Object.keys(this.state.filteredCoins).map((key) =>(
  <div id="crypto-container2">
   < span className="right2"><NumberFormat value={this.state.filteredCoins[key].quotes.USD.price} displayType={'text'} decimalprecision={2} thousandSeparator={true} prefix={'$'}/></span>
</div>  ))}
</span>
       </div>
       


       
    )
  }
}
 