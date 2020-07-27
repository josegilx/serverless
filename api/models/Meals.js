const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Meals = mongoose.model('Meal', new Schema(
    {
        name: String,
        desc: String
    }
));

// console.log(Meals)
module.exports = Meals;




// const MealSchema = new mongoose.Schema({
//         name: String,
//         desc: String
// });

// const Meal = mongoose.model('Meal', MealSchema);
// module.exports = Meal;
