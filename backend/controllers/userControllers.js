import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc     Auth user and get token
// @route    POST /api/products
// @access   Public Route
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    
    const user = await User.findOne({ email })

        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            })
        } else {
            res.status(401)
            throw new Error('Invalid Email or Password')
        }
 })

// @desc     Register a New User
// @route    POST /api/users
// @access   Public Route
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    
    const userExists = await User.findOne({ email })

        if(userExists){
            res.status(400)
            throw new Error('User Already Exists')
        }
        
    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.status(201).json(
            {
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                token: generateToken(user._id)
            }
        )
    } else {
        res.status(400)
        throw new Error('Invalid User Data')
    }
 })

// @desc     Get user profile
// @route    GET /api/profile
// @access   Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)
    if(user){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User AWOL')
    }
 })


export { 
    authUser,
    registerUser,
    getUserProfile
}