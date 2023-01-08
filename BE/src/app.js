const express = require('express')
const userRouter = require('./routers/user')
const foodRouter = require('./routers/food')
var cors = require('cors');

require('./db/mongoose')

const app = express()

app.use(express.json())
app.use(cors({origin: '*'}));
app.use(userRouter)
app.use(foodRouter)

module.exports = app