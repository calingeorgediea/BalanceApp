const mongoose = require('mongoose')
const databaseName = 'Balance';
const connectionURL = process.env.MONGODB_URL

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

