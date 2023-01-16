const express = require('express')
const router = new express.Router()
const Food = require('../models/food')
const auth = require('../middleware/auth')
const multer = require('multer')
const foodservice = require('../../utils/FoodService')
const chalk = require('chalk')
const log = console.log;
const moment = require('moment')
const dateformat = require('date-format')

const now = new Date();
console.log(dateformat('yyyy-MM-dd', new Date()))

router.post('/food', auth, async(req,res) => {
    const food = new Food({
        ...req.body,
        remaining_kcal: req.user.kcalGoal,
        owner: req.user._id
    })
    console.log(req.user.kcal)
    try {
        await food.save()
        res.status(201).send(food)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/me/food/:id', auth, async (req,res) => {
    if(req.body.qty){
        var qty = req.body.qty
    } else {
        var qty = 1;
    }
    let when = req.body.when;

    try {
        // Call foodservice - Send ID aFnd associate food item
        // to user. Service returns data needed to create a meal.
        // Each meal is associated to unique user.
        const food_id = req.params.id
        foodservice(food_id, async (error, {name,kcal,id} = {}) => {
            if(error){
                log(chalk.red.inverse("ERROR"));
                console.log(error)
                log(chalk.purple.inverse(error));
            }

            try {
                const food = new Food({
                    id,
                    name,
                    qty,
                    kcal,
                    date: dateformat('yyyy-MM-dd', new Date()),
                    when: when,
                    owner: req.user._id
                })
                await food.save()
                res.status(200).send()
            } catch {
                res.status(400).send()
            }
        })
        res.status(200).end()
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/me/food', auth, async (req,res) => {
    const match = {}
    const sort = {}

    if(req.query.dateA) {
        if (!match.date) {
            match.date = {}
        }
        match.date[/\[(.*?)\]/.exec(req.query.dateA)[1]] = /\((.*?)\)/.exec(req.query.dateA)[1]
    }

    if(req.query.limit){
        var limit = Number(req.query.limit)
    }
    if(req.query.skip){
        var skip = Number(req.query.skip)
    }

    if(req.query.dateB) {
        if (!match.createdAt) {
            match.createdAt = {}
        }
        match.date[/\[(.*?)\]/.exec(req.query.dateB)[1]] = /\((.*?)\)/.exec(req.query.dateB)[1]
    }

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1: 1
    }
    req.query.completed
    console.log('match:::', match)
    try {
        await req.user.populate({
            path: 'food',
            match: match,
            options: {
                skip: parseInt(req.query.skip),
                limit: parseInt(req.query.limit),
            },
    }).execPopulate()
        res.send(req.user.food)
    } catch(e) {
        res.status(500).send()
    }
})

router.patch('/me/food/:id', auth, async (req,res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['qty', 'description', 'name', 'kcal', 'date']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update) )
    if ( !isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'})
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

router.delete('/me/food/:id', async (req,res ) => {
    console.log("ok")
    const _id = req.params.id;

    try {
        const food = await Food.findOneAndDelete({ 'id' : _id})
        if(!food){
            return res.status(404).send()
        }
        res.send(food)
    } catch(e) {
        console.log(e)
        res.status(400).send(e)

    }
})

module.exports = router