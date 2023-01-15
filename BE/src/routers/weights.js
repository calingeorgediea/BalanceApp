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
        ...req.body,
        weight : req.user.weight,
        owner: req.params.user_id
    })

    try {
        await weight.save()
        res.status(201).send(weight)
    } catch(e) {
        res.status(400).send(e)
    }
})

module.exports = router