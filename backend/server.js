import express  from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'
import products  from './data/products.js'

dotenv.config()
connectDB()
const app = express()



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

const PORT = process.env.PORT || 5000

app.listen(5000, ()=> {
    console.log(`She's runnin' in ${process.env.NODE_ENV} mode on ${PORT}`.brightYellow)
})