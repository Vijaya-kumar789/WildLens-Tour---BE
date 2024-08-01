//import mongoose 
const mongoose = require('mongoose');

//create a schema for guide
const guideSchema = new mongoose.Schema({
    name : String,
    email: String,
    passwordHash : String,
    experience : String,
    specialties : [String],
    languages: [String],
    availableDates : [],
    role :{
        type:String, 
        default:"guide"
    }
});

// create a module from schema and export it
module.exports = mongoose.model("Guide" , guideSchema, "guides");