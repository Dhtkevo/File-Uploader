const express = require("express");

const userRouter = express.Router();

const {
  showLoginForm,
  showSignupForm,
  loginUserPost,
  registerUserPost,
} = require("../controllers/userController");

userRouter.get("/login", showLoginForm);
userRouter.get("/register", showSignupForm);
userRouter.post("/login", loginUserPost);
userRouter.post("/register", registerUserPost);

module.exports = userRouter;
