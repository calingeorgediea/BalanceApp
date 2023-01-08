const request = require('request')
const chalk = require('chalk')
const log = console.log;

const foodservice = (food_id, callback) => {
    const url = "http://localhost:3001/food/" + food_id
    request({ url, json: true }, (error, {body}) => {
        if(error) {
            console.log(error)
            callback(error, undefined)
        } else if ( body.error ) {
            onsole.log(error)
            callback(error, undefined)
        } else {
            callback(undefined, {
                name: body.name,
                kcal: body.kcal,
                id: body._id,
            })

            log(chalk.red.inverse("Food Service"));
            console.log(body)
            log(chalk.blue.inverse(body._id));
        }
    })
    callback(url)
}

module.exports =  foodservice