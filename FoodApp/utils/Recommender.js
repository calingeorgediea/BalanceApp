const request = require('request')
const chalk = require('chalk')
const log = console.log;

// utils for calculating calorie deficit for weight loss

function kg_to_kcal(kg) {
    // 1 kilo of body fat is around 7700 calories
    // returns how much kcal to loose a day
    return kg * 7700 / 7
}

const recommender = ({age, weight, height, activity_level, gender, goal_per_week}) => {

    // goal_per_week is how much kg you want to loose a week.
    // known-constants from nutrition websites
    console.log(age)
    activity_constant = {
        "1" : 1.55,
        "2" : 1.85,
        "3" : 2.2,
        "4" : 2.4
    }
    const physical_activity_ratio = activity_constant[activity_level]
    // If gender is male
    if ( gender == 0 ) {
        const bmr = 10 * weight + 6.25 * height - 5 * age + 5
        // This is how much you should eat a day to keep your weight
        const maintenance_calories = bmr * physical_activity_ratio
        return maintenance_calories - kg_to_kcal(goal_per_week)
    }
    // If gender is female
    if ( gender == 1 ) {
        const bmr = 10 * weight + 6.25 * height - 5 * age - 161
        // This is how much you should eat a day to keep your weight
        const maintenance_calories = bmr * physical_activity_ratio
        return maintenance_calories - kg_to_kcal(goal_per_week)
    }
}

module.exports =  recommender