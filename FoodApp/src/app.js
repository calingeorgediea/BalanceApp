const express = require('express')
const userRouter = require('./routers/food')
require('./db/mongoose')
const app = express()
app.use(express.json())
app.use(userRouter)
module.exports = app