import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router()
import Product from '../models/productModel.js'

// @desc     Fetch All Products
// @route    GET /api/products
// @access   Public Route
router.get(
    '/', 
    asyncHandler(async (req, res) => {
    const products = await Product.find({})
    // throw new Error('Ya Basic')
    // res.status(401)
    // throw new Error("Yo Bitch Ass Ain't comin' in...")
    res.json(products)
}))

// @desc     Fetches a single Product by its id
// @route    GET /api/products/:id
// @access   Public 
router.get(
    '/:id', 
    asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product Not Found.')
    }
}))


export default router