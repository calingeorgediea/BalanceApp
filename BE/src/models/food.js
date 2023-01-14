const mongoose = require('mongoose')
const validator = require('validator')

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    qty: {
        type: Number,
        default: false
    },
    kcal: {
        type: Number,
        default: false
    },
    description: {
        type: String,
        default: false
    },
    id: {
        type: String,
        default: false
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    date : {
        type: Date
    }
},{
    timestamps: true
})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food;