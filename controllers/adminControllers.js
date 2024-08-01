//import the user module
const User = require('../modules/users')

const TourPackage = require('../modules/tourPackages')

//import the booking module
const Review = require('../modules/reviews');

//define the admin Controller
const adminController = {
    //define the getAllUsers method
    getAllUsers : async (req,res) => {
        try {
            //get all users from the Database
            const users = await User.find().select("-passwordHash -__v");

            //return the users
            res.status(200).json({users});

        } catch (error) {
            res.status(500).json({ message: error.message }); 
        }
    },

    getAllTours : async (req,res) => {
        try {
            //get all users from the Database
            const tours = await TourPackage.find();

            //return the users
            res.status(200).json({tours});

        } catch (error) {
            res.status(500).json({ message: error.message }); 
        }
    },

   //define the userUpdate method
   updateUserById : async (req,res) => {
    try{
         // get the user id in req params
         const userId = req.params.id;

         // get the user input from req body
         const {role} = req.body;

         // find the user Id from the database
         const user = await User.findById(userId);

        //if the user does not exists, return a error message
          if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        //update the user role
        if (role) user.role =role;
        
        //save the user details
        const updatedUser = await user.save();

        res.status(200).json({massage : "user role updated successfully" , user : updatedUser});

    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
   },
   deleteReview : async (req,res) => {
    try {
        // get the tour id from the params
        const tourId = req.params.id;

        const userId = req.userId;

        const user = await User.findById(userId)
        
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You Con't able to delete review" });
        } 
            await Review.findByIdAndDelete(tourId);
        
            res.status(200).json({message : "Review deleted successfully"})     
    
    } catch (error) {
        res.status(500).json({message: error.message })
    }
}
} 
//export the controller
module.exports = adminController;