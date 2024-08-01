//import the Support and Feedback module 
const Support = require('../modules/support&feedback')
const Feedback = require('../modules/support&feedback');

//define the Support and Feedback controller
const supAndFeedController = {
    // define the contectSupport method
    contactSupport : async (req,res) => {
        try {
            //get the user from req body
            const userId = req.userId;

            const {message} = req.body;
          
            const newSupport = new Support ({
                userId : userId,
                message
            });
            //save the new booking    
            const savedSupport = await newSupport.save();

            //return a success message with saved user
            res.status(200).json({message : "support request sent successfully" , savedSupport})
        } catch (error) {
            res.status(500).json({message : error.message});
        }
    },
    subFeedback : async (req,res) =>{
        try {

        //get the user from req body
            const userId = req.userId;
            
            const {message} = req.body;

            const newFeedback = new Feedback ({
                userId : userId,
                message : message 
            });
            //save the new booking    
            const savedFeedback = await newFeedback.save();

            //return a success message with saved user
            res.status(200).json({message : "Feedback sent successfully" , savedFeedback})
        } catch (error) {
            res.status(500).json({message : error.message});
        }
    }
}


module.exports = supAndFeedController;