const express = require('express')
const router = new express.Router()
const Weight = require('../models/weights')
const auth = require('../middleware/auth')
const dateformat = require('date-format')
const { ObjectId } = require('mongoose')

const now = new Date();
console.log(dateformat('yyyy-MM-dd', new Date()))

router.post('/weights/:user_id', auth, async(req,res) => {
    const weight = new Weight({
        weight : req.body.weight,
        owner: req.params.user_id
    })

    try {
        await weight.save()
        res.status(201).send(weight)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/weights/:user_id', auth , async (req,res) => {
    const _id = req.params.user_id;

    var match = {}
    var sort = {}

    try {
        const weights = await Weight.find({owner : _id})
        if(!weights){
            return res.status(404).send()
        }
        res.send(weights)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router