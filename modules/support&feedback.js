//import mongoose 
const mongoose = require('mongoose');

//create a schema for support
const supportSchema = new mongoose.Schema({
        userId :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        message : String
});

//create a schema for feedback
const feedbackSchema = new mongoose.Schema({
    userId :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    message : String
})

// create a module from schema and export it

module.exports = mongoose.model("Support" , supportSchema, "supports");
module.exports = mongoose.model("Feedback" , feedbackSchema, "feedbacks");
