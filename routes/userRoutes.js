//import the express for router
const express = require("express");

// import the userController
const userController = require("../controllers/userController");

//import the auth
const auth = require('../middleware/auth');

//import the express router
const userRouter = express.Router();

//define the endpoints

//Un authenticated route
userRouter.post('/register',userController.register);
userRouter.post("/login",userController.login);

//authenticated route
userRouter.get("/profile", auth.isAuth, userController.profile);
userRouter.get("/logout", auth.isAuth , userController.logout);
userRouter.put("/:id", auth.isAuth, userController.updateUserById);
userRouter.delete("/:id", auth.isAuth, userController.deleteUserById);


//export the router
module.exports = userRouter;
