const express = require('express')
//initialize the express app
const app = express()

const products = require('./data/products') 

app.get('/', (req, res) => {
    res.send('The API is running')
})

app.get('/api/products', (req, res) => {
    res.json(products)
})

//Gets a single product by its id
app.get('/api/products/:id', (req, res) => {
    const product = products.find((item) => item._id === req.params.id)
    res.json(product)
})



app.listen(5000, ()=> {
    console.log('Server 5000 hears you.')
})