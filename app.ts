require("dotenv").config();

import express, { Application, Request, Response } from "express";
const app: Application = express();
import path from "node:path";
const PORT = process.env.PORT || 3000;
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

app.use(
  session({
    secret: process.env.SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
