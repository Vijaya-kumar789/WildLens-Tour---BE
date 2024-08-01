//import mongoose 
const mongoose = require("mongoose");

//create a schema for User
const paymentSchema = new mongoose.Schema ({
    initiatePayment : {
       userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
       bookingId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Booking"
       },
       amount : Number,
       currency : {
         type :String,
        enum : ["INR","USD"],
        default : 'INR'
       },
       paymentMethod : String,
       returnUrl : String,
       transactionId : Sting
    } 
}); 

// create a module from schema and export it
module.exports = mongoose.model("Payment" , paymentSchema, "payments");