//import the express for router
const express = require("express");

//import the adminControllers
const adminController = require("../controllers/adminControllers")
const auth = require('../middleware/auth');

//import the express router
const adminRouter = express.Router();

//define the endpoints
adminRouter.get("/users",auth.isAuth,auth.isAdmin , adminController.getAllUsers);
adminRouter.get("/tours",auth.isAuth,auth.isAdmin , adminController.getAllTours);
adminRouter.put("/:id",auth.isAuth,auth.isAdmin , adminController.updateUserById);
adminRouter.delete("/reviews/:id",auth.isAuth,auth.isAdmin , adminController.deleteReview);

//export the router
module.exports = adminRouter;