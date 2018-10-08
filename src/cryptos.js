 

import React, { Component } from "react";
import axios from 'axios'
 var NumberFormat = require('react-number-format');
export default class Cryptos extends Component {
  constructor(props) {
    super(props);

    this.state = { 
        cryptos: []
  };

  componentDidMount() {    
     axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC&tsyms=USD')
     .then(response => {
       const cryptos = response.data;
       console.log(cryptos)
       this.setState({cryptos: cryptos});
     })
    }

  render() {
    return (
        <div className="App">
       {Object.keys(this.state.cryptos).map((key) =>(
  <div id="crypto-container">
  <span className="left">{key}</span>
  < span className="right"><NumberFormat value={this.state.cryptos[key].USD} displayType={'text'} decimalPrecision={2} thousandSeparator={true} prefix={'$'}/></span>
</div>  ))}
