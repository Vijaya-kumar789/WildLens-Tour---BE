// //import the express for router
// const express = require("express");

// // import the userController
// const guideController = require("../controllers/guideController");

// //import the auth
// const auth = require('../middleware/auth');

// //import the express router
// const guideRouter = express.Router();

// //define the endpoints

// //Un authenticated route
// guideRouter.post('/register',guideController.register);
// guideRouter.post("/login",guideController.login);

// //authenticated route
// guideRouter.get("/profile", auth.isGuide, guideController.profile);
// guideRouter.get("/logout", auth.isGuide , guideController.logout);
// guideRouter.get("/",auth.isAuth, guideController.listAllGuides);
// guideRouter.get("/:id",auth.isAuth, guideController.getGuideById);
// guideRouter.post("/",auth.isAuth,auth.isAdmin, guideController.createGuide);
// guideRouter.put("/:id", auth.isGuide, guideController.updateGuideById);
// guideRouter.put("/:id",auth.isAuth,auth.isAdmin, guideController.updateGuideById);
// guideRouter.delete("/:id",auth.isAuth,auth.isAdmin, guideController.deleteGuideById);
// guideRouter.put("/:id/availability",auth.isGuide, guideController.setGuideAvailable);
// guideRouter.get("/:id/availability", auth.isAuth , guideController.getGuideAvailability);

// //export the module
// module.exports = guideRouter;