const mongoose = require('mongoose')
const validator = require('validator')

const weightsSchema = new mongoose.Schema({
    weight: {
        type: String,
        required: true
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
},{
    timestamps: true
})

const Weights = mongoose.model('Weights', weightsSchema)

module.exports = Weights;