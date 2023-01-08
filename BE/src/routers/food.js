const express = require('express')
const router = new express.Router()
const Food = require('../models/food')
const auth = require('../middleware/auth')
const multer = require('multer')
const foodservice = require('../../utils/FoodService')
const chalk = require('chalk')
const log = console.log;
const moment = require('moment')

router.post('/food', auth, async(req,res) => {
    const task = new Food({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/me/food/:id', auth, async (req,res) => {
    if(req.body.qty){
        console.log("req.query.qty" + req.body.qty)
        var qty = req.body.qty
    } else {
        var qty = 1;
    }
    try {
        // Call foodservice - Send ID and associate food item
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
                    owner: req.user._id
                })
                await food.save()
                res.status(200).send()
            } catch {
                res.status(400).send()
            }
        })
        res.send(200).send(food)
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/me/food', auth, async (req,res) => {
    const match = {}
    const sort = {}

    if(req.query.date) {
        match.gte = /^(.+?),/.exec(req.query.date)[1]
        match.lte = /[^,]*$/.exec(req.query.date)[0]
        console.log(match.createdAt)
    }

    if (req.query.completed) {
        match.completed = req.query.completed === 'true'
    }

    // if (req.query.sortBy) {
    //     const parts = req.query.sortBy.split('_')
    //     sort[parts[0]] = parts[1] === 'desc' ? -1: 1
    // }

    // req.query.completed

    console.log(moment(match.afterDate))
    console.log(match)
    try {
        await req.user.populate({
            path: 'food',
            match: {
                createdAt: {
                    $gte: match.gte,
                    $lte: match.lte
                }
            },
    }).execPopulate()
        res.send(req.user.food)
    } catch(e) {
        res.status(500).send()
    }
})

module.exports = router