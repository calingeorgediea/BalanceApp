const express = require('express')
const userRouter = require('./routers/user')
const foodRouter = require('./routers/food')
require('./db/mongoose')
const app = express()
app.use(express.json())
app.use(userRouter)
app.use(foodRouter)
module.exports = app