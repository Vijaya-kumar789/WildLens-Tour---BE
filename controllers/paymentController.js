//import the Payment module
const Payment = require("../modules/payments");

//define the payment controller
const paymentController = {

    //define the initiate payment method
    initiatePayment : async (req,res) => {
        try {
            //get the userId from req body
            const userId = req.userId;
            
        } catch (error) {
            res.status(500).json({message : error.message});
        }
    }
}