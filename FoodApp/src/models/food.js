const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const foodSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true,
            lowercase: true
        },
        kcal: {
            type: Number,
            trim: true,
            required: true,
        },
        category: {
            type: String,
            trim: true,
            lowercase: true
        },
        image: {
            type: Buffer
        }
    },{
        timestamps: false,
    })

const food = mongoose.model('food', foodSchema)

module.exports = food