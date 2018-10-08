const express = require('express');
const { json } = require('body-parser')
const {getcoin, editcoin, addcoin, getcointicker, deletecoin} = require('./main_cntrl')
const cors = require('cors')
const port= 3001

const app = express()
app.use(json())
app.use(cors())

app.get('/api/listings/', getcoin);
app.post('/api/newlistings/', addcoin);
app.put('/api/editlistings/:id',  editcoin);
app.delete('/api/deletelistings/:id', deletecoin);
app.get('/api/ticker/', getcointicker);


app.listen(port, () => {
    console.log(`We are live on port: ${port}`)
})