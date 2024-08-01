//import the express for router
const express = require("express");

//import the supAndFeedController
const supAndFeedController = require('../controllers/sup&feedControllers')

//import the auth
const auth = require('../middleware/auth');

//import the express router
const supAndFeedRouter = express.Router();

//define the endpoints
supAndFeedRouter.post("/support/contact" , auth.isAuth , supAndFeedController.contactSupport);
supAndFeedRouter.post("/feedback" , auth.isAuth , supAndFeedController.subFeedback);

//export the module
module.exports = supAndFeedRouter;