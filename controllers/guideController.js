//import the user module
const Guide = require('../modules/guide')

//import the bcrypt library
const bcrypt = require("bcrypt");

//import the jsonwebtoken
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

//define the user Controller
const guideController = {
    // define the register method
    register: async (req, res) => {
        try {
            // get the user input from the req body
            const { name, email,password ,specialties,languages,experience} = req.body;

            // check the guidename is already exists   
            const guide = await Guide.findOne({ email });

            // if the guide exists, return a error message
            if (guide)
                return res.status(400).json({ message: "Guide is already exists" })

            //hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            //create a new user
            const newGuide = new Guide({
                name,
                email,
                passwordHash,
                experience,
                specialties,
                languages
            });

            // save the new user
            const savedGuide = await newGuide.save();

            //return a success message with saved user
            res.status(200).json({ message: "Guide created successfully", savedGuide });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // define the register method
    login: async (req, res) => {
        try {
            //get the username and password from req body
            const { email, password } = req.body;

            //check if the user is exits in database
            const guide = await Guide.findOne({ email });

            //if the user does not exists, return a error message
            if (!guide) {
                return res.status(400).json({ message: "Guide not found" })
            }

            //if the user exists , compare the password and check if it is correct 
            const isPasswordCorrect = await bcrypt.compare(password, guide.passwordHash)

            //if the password is incorrect return a error message
            if (!isPasswordCorrect) {
                return res.status(400).json({ message: "incorrect password" })
            }

            /* if the password is correct and generate a token for the 
            user and return it in the res along the success message */
            const token = jwt.sign({
                email : guide.email,
                id:guide._id,
                name : guide.name,
            },JWT_SECRET);

            //set a cookie with the token
            res.cookie('token' , token, {
                httpOnly : true,
                secure:true,
                sameSite : 'none',
                expires : new Date (Date.now() +24 * 60 * 60 * 1000) // 24h expiration
            });

            res.status(200).json({message : "Login successfully" , token});

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    //get the current logged in user
    profile : async (req,res) => { 
        try {
            // get the user id in req object
            const guideId = req.guideId;

            // find the user Id from the database
            const guide = await Guide.findById(guideId).select("-passwordHash -__v -_id"); 

            //if the user does not exists, return a error message
            if (!guide) {
                return res.status(400).json({ message: "guide not found" })
            }
            // if the user is exists return the user details
             res.status(200).json({guide});

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
      //logout the user
      logout: async(req,res) => {
        try {
            //clear the token cookie
            res.clearCookie('token');
            
            //return a success message
            res.status(200).json({ message : "logout successfully"});

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
     //define the listAllGuides method
     listAllGuides : async (req,res) => {
        try {
            //get all users from the Database
            const guides = await Guide.find().select("-passwordHash -__v -role" );

            //return the users
            res.status(200).json({guides});

        } catch (error) {
            res.status(500).json({ message: error.message }); 
        }
    },
    getGuideById: async (req, res) => {
        try {
            // get the guide id in req params
            const guideId = req.params.id;

            //find the guide in database
            const guide = await Guide.findById(guideId).select("-__v");

            //if the guide does not exists, return a error message
            if (!guide) {
                return res.status(400).json({ message: "Guide not found" })
            }
            res.status(200).json({ guide })
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    createGuide: async (req, res) => {
        try {
            // get the guide input from the req body
            const { name, email,password ,specialties,languages,experience} = req.body;

            // check the guidename is already exists   
            const guide = await Guide.findOne({ email });

            // if the guide exists, return a error message
            if (guide)
                return res.status(400).json({ message: "Guide is already exists" })

            //hash the password
            const passwordHash = await bcrypt.hash(password, 10);

            //create a new user
            const newGuide = new Guide({
                name,
                email,
                passwordHash,
                experience,
                specialties,
                languages
            });

            // save the new user
            const savedGuide = await newGuide.save();

            //return a success message with saved user
            res.status(200).json({ message: "Guide created successfully", savedGuide });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
     //define the Guide Update method
     updateGuideById: async (req, res) => {
        try {
            // get the guide Id in req params
            const guideId = req.params.id;

            //get the updated input form req body
            const updatedguide = await Guide.findByIdAndUpdate(guideId, req.body, {new: true });

            //if the guide does not exists, return a error message
            if (!updatedguide) {
                return res.status(400).json({ message: "Guide not found" })
            }
            //return the success message
            res.status(200).json({ message: "Guide Details Updated Successfully", Guide: updatedguide })
        
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    //define the Guide Delete method
    deleteGuideById : async (req,res) => {
        try {
            // get the guide id in req params
            const guideId = req.params.id;

            //find the guide id database
            const deleteGuide = await Guide.findByIdAndDelete(guideId);
            
            //if the guide does not exists, return a error message
             if(!deleteGuide) {
                return res.status(400).json({message : " Guide not found to delete"})
            }
            //return the success message
            res.status(200).json({message : "Guide successfully Deleted"});

        } catch (error) {
            res.status(500).json({ message: error.message });   
        }
    },
    setGuideAvailable: async (req, res) => {
        try {
            // get the guide id in req params
            const guideId = req.params.id;

            // get the guide input from the req body
            const {availableDates} = req.body;

            //find the guide in database
            const guide = await Guide.findById(guideId).select("-__v");

            //if the guide does not exists, return a error message
          if (!guide) {
            return res.status(400).json({ message: "guide not found" })
        }

        //update the guide role
        if (availableDates) guide.availableDates = availableDates;
        
        //save the guide details
        const updatedGuide = await guide.save();
        res.status(200).json({massage : "Guide available dates updated successfully" , guide : updatedGuide});

    } catch (error) {
        res.status(500).json({ message: error.message }); 
    }
   },
   getGuideAvailability: async (req, res) => {
    try {
        // get the guide id in req params
        const guideId = req.params.id;

        //find the guide in database
        const guide = await Guide.findById(guideId).select("_id availableDates");

        //if the guide does not exists, return a error message
        if (!guide) {
            return res.status(400).json({ message: "Guide not found" })
        }
        if(guide.availableDates.length == 0) {
            return res.status(400).json({ message: "Guide is not available" })
        }
        res.status(200).json({ guide })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
},
}   
//export the module
module.exports = guideController ;