const axios = require('axios')

var coin = []
var cointicker = []
function getcoin(req, res, next) {
    axios.get('https://api.coinmarketcap.com/v2/listings/').then(response => {
        console.log (response)
        coin = response.data.data.slice(0,10)
        res.status(200).send(coin)
    }).catch(err => res.status(500).send(err))
}

function getcointicker(req, res, next) {
    axios.get('https://api.coinmarketcap.com/v2/ticker/').then(response => {
        // console.log (response.data)
        cointicker.push(response.data)
        console.log ("data",cointicker)
        res.status(200).send(cointicker)
    }).catch(err => res.status(500).send(err))
}


function addcoin(req, res, next) {
    coin = [...coin, req.body.mycoin]
    console.log("req.body",req.body)
    res.status(200).send(coin)
}
function editcoin(req, res, next){
    const { id } = req.params;
    const { name } = req.body;
   
    coin[id] = Object.assign({}, coin[id], { name: req.body.name });
     res.status(200).send(coin)

}

function deletecoin(req, res, next ) {
   let removed = coin.splice(req.params.id, 1)
   console.log(coin,removed, req.params.id)
    res.status(200).send(coin)
}
 

module.exports = {
    getcoin,
    editcoin,
    addcoin,
    deletecoin,
    getcointicker
}