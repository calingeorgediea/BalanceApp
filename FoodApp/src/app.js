const express = require('express')
const userRouter = require('./routers/food')
var cors = require('cors');

require('./db/mongoose')
const app = express()
app.use(express.json())
app.use(cors({origin: '*'}));
app.use(userRouter)
module.exports = app