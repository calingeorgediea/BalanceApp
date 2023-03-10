const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Food = require('./food')

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        mail: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if(validator.isEmail(value) == false ){
                    throw new Error('Mail is not valid')
                }
            }
        },
        password: {
            type: String,
            minlength: 6,
            trim: true,
            hide: true,
            validate(value) {
                if(value.toLowerCase().includes("password")){
                    throw new Error("Must not contain password")
                }
            }
        },
        kcalGoal: {
            type: Number,
            default: 0,
        },
        weight: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
        },
        age: {
            type: Number,
            default: 0,
        },
        gender: {
            type: Number,
            default: 0,
        },
        goal: {
            type: Number,
            default: 0,
        },
        activity_level: {
            type: Number,
            default: 0,
        },

        tokens: [{
            token: {
                type: String,
                required: true
            }
        }],
        avatar: {
            type: Buffer
        }
    },{
        timestamps: true,
    })

userSchema.virtual('food', {
    ref: 'Food',
    localField: '_id',
    foreignField: 'owner'
})

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, process.env.JWT_SECRET)
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar
    return userObject
}

userSchema.statics.findByCredentials = async(mail, password) => {
    const user = await User.findOne({mail})
    if(!user){
        throw new Error('E-mail not found')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        throw new Error('Invalid password');
    }
    return user;
}

// middleware to encrypt password before saving
userSchema.pre('save', async function(next) {
    const user = this
    if( user.isModified('password') ) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    console.log('Just before saving')
    next()
})

// Delete user tasks when user is removed
// userSchema.pre('remove', async function(next) {
//     const user = this
//     await Task.deleteMany( { owner: user._id} )
//     next()
// })

const User = mongoose.model('User', userSchema)

module.exports = User