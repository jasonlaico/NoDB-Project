import React, { Component } from 'react';
import logo from './btx.jpg';
import './App.css';
import Coininfo from './Coininfo';
import axios from 'axios'
import Cointicker from './cointicker';
import Seal from './Seal.png';
import Skybg from './skybg.jpg';
import Footer from './footer';
var NumberFormat = require('react-number-format');

 class App extends Component {
  constructor(prop){
    super(prop)
    this.state = {
      coin: [],
      coinText: '',
      cointicker: [],
      cryptos:[] ,
      news:[]

    }
    
  
  this.createCoin = this.createCoin.bind(this);
  this.updateCoin = this.updateCoin.bind(this);
  this.deleteCoin = this.deleteCoin.bind(this);
  this.handleNameInput = this.handleNameInput.bind(this);
}
componentDidMount(){ 
  axios.get('http://localhost:3001/api/listings/').then( response => {
    console.log(response)
    this.setState({coin: response.data})
  })

 
  axios.get('http://localhost:3001/api/ticker/').then( response => {
  console.log(response.data[0].data)
  console.log(response.data)
  this.setState({cointicker: response.data[0].data})
   })

   axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,LTC,ETH,XRP,XMR,XLM&tsyms=USD')
   .then(response => {
     const cryptos = response.data;
     console.log(cryptos)
     this.setState({cryptos: cryptos})
   })
  
   axios.get('https://content.guardianapis.com/search?q=crypto&from-date=2014-01-01&api-key=614b6bf2-64f7-44e9-86d6-7f3293dbd0c4')
   .then(response => {
     const news = response.data.response.results   ;
     const mape = news.map(e => e.webTitle)
     console.log(mape)
     this.setState({news:mape})
    })
  
}
  createCoin() {
    const mycoin = {
      "id": 3030, 
      "name": "Jasoncoin",  
      "symbol": "JSC", 
      "website_slug": "Jasoncoin" 
    
    };

    axios
    .post(`http://localhost:3001/api/newlistings/`, {mycoin})
    .then(response => {
      console.log(response)
      this.setState({ coin: response.data });
    })
    // .catch(e => alert(e));
}
updateCoin(id, name) {
  axios
    .put(`http://localhost:3001/api/editlistings/${id}`, {name})
    .then(response => {
      this.setState({ coin: response.data });
    })
    .catch(console.log);
}
 
deleteCoin(id) {
  console.log(id)
  axios
    .delete(`http://localhost:3001/api/deletelistings/${id}`)
    .then(response => {
      this.setState({ coin: response.data });
    })
    .catch(console.log);
}

handleNameInput(e) {
  this.setState({ name: e.target.value });
}  
  
  render() {
 
    console.log('State', this.state)
    
    return (

      <div className="App">
    <header className="App-header">
    {/* <img src={Skybg}  className="Skybg" alt="skybg" /> */}

      <img src={logo}  className="App-logo" alt="logo" />
     <h1 className="App-title" >My Crypto Buddy</h1>
     <h2 className="belowtitle">The #1 exclusively personalized cryptocurrency tool.</h2>
   </header>
       <div>
        <Cointicker
        state ={this.state}/>

        <br/>
        <br/>
<br></br>
<br></br>

    <p1>Major Currency Prices</p1>
  {Object.keys(this.state.cryptos).map((key) =>(
  <div id="crypto-container">
  <span className="left">{key}</span>
  < span className="right"><NumberFormat value={this.state.cryptos[key].USD} displayType={'text'} decimalprecision={2} thousandSeparator={true} prefix={'$'} /></span>
</div>  ))}


 
 
       </div>
    <h5>Check out some popular coins below</h5>
        {this.state.coin.length > 0 &&
         this.state.coin.map((val, i) => (
            <Coininfo
              key={i}
              updateCoin={this.updateCoin}
              deleteCoin={this.deleteCoin}
              coin={val}
              index={i}
            />
          ))}
             <br />
        <br />
      
          <button onClick={this.createCoin }>CREATE SURPRISE COIN</button>

        
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />


  <div className="bottomfilter">


  <div>
  <p1>Latest crypto headlines</p1>



      {Object.keys(this.state.news).map((key) =>(
  <div id="news-container">
  <span className="left">{this.state.news[key]}</span>
</div>  ))}

 </div>
       </div>
      
        <Footer/>
       </div>


    );
  }
}
 
export default App;