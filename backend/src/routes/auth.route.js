const {Router}=require("express");
const authController=require("../controllers/auth.controller");
const authMiddleware=require("../middlewares/auth.middleware")

const authRouter=Router();

// @route POST /auth/api/register
// @description register a user
// @access public

authRouter.post("/register",authController.registerUserController);

// @route /auth/api/login
// @desc login an existing user

authRouter.post("/login",authController.loginUserController);

//@route /auth/api/logout
//@desc logout a user by putting in blacklist token and clearing cookie

authRouter.get("/logout", authController.logoutUserController)

//@route /auth/api/get-me
//@desc get the details of current user

//use of second middleware is to protect the route from being accessed from anywhere, usermidllware serves the purpose of authentication before running the controller, without it anyone could access the get me page without even logging in
authRouter.get("/get-me",authMiddleware.authUser,authController.getMeUserController)

module.exports=authRouter