const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
// const sharp = require('sharp')
// const { sendWelcomeEmail,sendCancelationEmail } = require('../emails/account')

router.post('/users', async (req,res) => {
    const user = new User(req.body)
    try {
        await user.save()
        // send email to welcome new user
        // sendWelcomeEmail(user.mail, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})


router.post('/users/logout', auth, async(req,res) => {
try {
    req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token
    })
    await req.user.save()
    res.send()
} catch(e) {
    res.status(500).send()
}
})

router.post('/users/logout/all', auth, async(req,res) => {
    try {
        req.user.tokens = [];
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth , async (req,res) => {
    res.send(req.user)
})

router.patch('/users/me', auth, async ( req,res ) => {
    // object to array of properties
    const updates = Object.keys(req.body)
    // what can be modified
    const allowedUpdates = ['name', 'email', 'password', 'kcalGoal', 'goal', 'weight', 'height', 'age', 'gender', 'activity_level']
    // every tests if all elements in array pass a test implemented in the provided function, returns boolean
    // includes determines whether an array includes a certain value, returns true/false : if 9 true and 1 false, returns false.
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update) )
    if ( !isValidOperation) {
        return res.status(400).send({error: 'Invalid updates'})
    }
    try {
       updates.forEach((update) => req.user[update] = req.body[update])
       await req.user.save()
        res.send(req.user)
// server error
    } catch(e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req,res) => {
    const _id = req.params._id;
    console.log(req.user._id)
    try {
        await req.user.remove()
        console.log(req.user.mail)
        console.log(req.user.name)
        // send mail to delete user
        // sendCancelationEmail(req.user.mail, req.user.name)
        res.send(req.user)
    } catch(e) {
        res.status(500).send(e)
    }
})

router.post('/users/login', async(req,res) => {
    try {
        const user = await User.findByCredentials(req.body.mail, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user: user, token })
    } catch(e) {
        res.status(400).send()
    }
})

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Only JPG,JPEG,PNG Document'))
        }
        cb(undefined,true)
    }
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
}, (error,req,res,next) => {
    res.status(400).send({error: error.message})
})

module.exports = router