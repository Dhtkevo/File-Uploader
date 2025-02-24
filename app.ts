require("dotenv").config();

import express, { Application, Request, Response } from "express";
const app: Application = express();
import path from "node:path";
const PORT = process.env.PORT || 3000;
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
import expressSession from "express-session";
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
import { PrismaClient } from "@prisma/client";
import { getUserById, getUserByUsername } from "./db/queries";
import bcrypt from "bcryptjs";

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // ms
    },
    secret: process.env.SECRET_SESSION!,
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);

passport.use(
  new LocalStrategy(async (username: string, password: string, done: any) => {
    try {
      const user = await getUserByUsername(username);

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

interface User {
  id: number;
  username: string;
  password: string;
}

passport.serializeUser((user: User, done: any) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done: any) => {
  try {
    const user = getUserById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

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
