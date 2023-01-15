const request = require('request')
const chalk = require('chalk')
const log = console.log;

// utils for calculating calorie deficit for weight loss

function kg_to_kcal(kg) {
    // 1 kilo of body fat is around 7700 calories
    // returns how much kcal to loose a day
    return kg * 7700 / 7
}

// gender (0 male) (1 female)
// activity level (1 f putin) (2 putin) (3 mult) (4 foarte mult)
// goal (0 slabesti) (1 mentii) (2 te ingrasi)

// For weight loss:

// Calculate your BMR using the Harris-Benedict equation for your gender and activity level
// Create a calorie deficit by consuming 500-1000 calories less than your BMR
// For weight maintenance:

// Calculate your BMR using the Harris-Benedict equation for your gender and activity level
// Consume the same number of calories as your BMR
// For weight gain:

// Calculate your BMR using the Harris-Benedict equation for your gender and activity level
// Create a calorie surplus by consuming 500-1000 calories more than your BMR

const recommender = ({age, weight, height, activity_level, gender, goal}) => {

    // losing_goal_per_week is how much kg you want to loose a week.
    // known-constants from nutrition websites
    console.log(age)
    activity_constant = {
        "0" : 1.2,
        "1" : 1.375,
        "2" : 1.55,
        "3" : 1.725
    }
    const physical_activity_ratio = activity_constant[activity_level]
    let maintenance_calories
    // If gender is male
    if ( gender == 0 ) {
        // const bmr = 10 * weight + 6.25 * height - 5 * age + 5
        const bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age)
        // This is how much you should eat a day to keep your weight
        maintenance_calories = bmr * physical_activity_ratio
    }
    // If gender is female
    if ( gender == 1 ) {
        const bmr = 10 * weight + 6.25 * height - 5 * age - 161
        // This is how much you should eat a day to keep your weight
        maintenance_calories = bmr * physical_activity_ratio
    }

    if (goal == 0) { // scazi 0.5kg pe sapt by default
        return Math.ceil(maintenance_calories - kg_to_kcal(0.5)); 
    } else if (goal == 1) {
        return Math.ceil(maintenance_calories); 
    } else if (goal == 2) { // adaugi 0.5kg pe sapt by default
        return Math.ceil(maintenance_calories + kg_to_kcal(0.5)); 
    }
}

module.exports =  recommender