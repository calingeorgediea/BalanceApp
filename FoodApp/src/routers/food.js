const express = require('express')
const router = new express.Router()
const Food = require('../models/food')
const multer = require('multer')
var cors = require('cors')

// const sharp = require('sharp')
// const { sendWelcomeEmail,sendCancelationEmail } = require('../emails/account')

// Add new food item
router.post('/food', cors(), async (req,res) => {
    const match = {}
    const food = new Food(req.body)
    try {
        await food.save()
        res.status(201).send({food})
    } catch(e) {
        res.status(400).send(e)
    }
})

router.get('/food', async (req,res) => {
    var match = {}
    var sort = {}
    if(req.query.category) {
        match.category = req.query.category.split(",")
    }
    if(req.query.name) {
        match.name = req.query.name
        match.name = { $regex: new RegExp(req.query.name, 'i') }
        console.log(match.name)
    }
    if(req.query.kcal) {
        const operation = /\[(.*?)\]/.exec(req.query.kcal)[1]
        const value = /[^:]*$/.exec(req.query.kcal)[0]
        match.kcal = {}
        match.kcal[operation]=value
    }
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1: 1
        console.log(sort)
    }
    if(req.query.limit){
        var limit = Number(req.query.limit)
    }
    if(req.query.skip){
        var skip = Number(req.query.skip)
    }
    console.log(match)
    try {
        var response = await Food
            .find(match)
            .limit(limit)
            .skip(skip)
            .sort(sort)
            .exec();
    } catch(e) {
        res.status(500).send()
    }
    res.send(response)
})

router.get('/food/:id', async (req,res) => {
    const _id = req.params.id;
    try {
        const food = await Food.findById(_id)
        if(!food){
            return res.status(404).send()
        }
        res.send(food)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/food/:id', async (req,res ) => {
    const _id = req.params.id;
    try {
        const food = await Food.findByIdAndDelete(_id)
        if(!food){
            return res.status(404).send()
        }
        res.send(food)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.patch('/food/:id',  async(req,res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ['name', 'description', 'kcal']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log(isValidOperation)
    if (!isValidOperation ) {
        return res.status(400).send({error: 'Invalid update'})
    }
    try {
        const food = await Food.findOne({_id: req.params.id})
        if(!food) {
            return res.status(404).send()
        }
        updates.forEach((update) => food[update] = req.body[update] )
        await food.save()
        res.send(food)
    } catch(e) {
        res.status(400).send(e)
    }
})
module.exports = router