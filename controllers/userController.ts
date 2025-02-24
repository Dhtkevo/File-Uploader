import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { createUser } from "../db/queries";
import passport from "passport";

const showLoginForm = (req: Request, res: Response) => {
  res.render("login");
};

const showSignupForm = (req: Request, res: Response) => {
  res.render("register");
};

const registerUserPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await createUser(req.body.username, hashedPassword);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const loginUserPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/error",
});

module.exports = {
  showLoginForm,
  showSignupForm,
  registerUserPost,
  loginUserPost,
};
