const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const User = require('../../src/models/user')
const Food = require('../../src/models/food')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Calin',
    mail: 'calin@gmail.com',
    password: '1234what',
    tokens: [{
        token: jwt.sign({ _id: userOneId}, process.env.JWT_SECRET )
    }]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'george',
    mail: 'gg@gmail.com',
    password: 'hashahsada',
    tokens: [{
        token: jwt.sign({ _id: userTwoId}, process.env.JWT_SECRET )
    }]
}

const foodOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'first food',
    name: "food_item_1",
    category: "food_category_1",
    owner: userOne._id
}

const foodTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'second food',
    name: "food_item_2",
    category: "food_category_2",
    owner: userOne._id
}

const foodThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'second three',
    name: "food_item_3",
    category: "food_category_3",
    owner: userOne._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Food.deleteMany()
    await new Food(foodOne).save()
    await new Food(foodTwo).save()
    await new Food(foodThree).save()
    await new User(userOne).save()
    await new User(userTwo).save()
}


module.exports = {
    userOneId,
    userOne,
    setupDatabase,
    userTwoId,
    userTwo,
    foodOne,
    foodTwo,
    foodThree
}