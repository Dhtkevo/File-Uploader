require("dotenv").config();

import express, { Application, Request, Response, NextFunction } from "express";
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
import { ensureAuthenticated } from "./auth/auth";
import { fileRouter } from "./routes/fileRoutes";
const userRouter = require("./routes/userRoutes");
import { folderRouter } from "./routes/folderRoutes";
import { User } from "@prisma/client";

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

passport.serializeUser((user: User, done: any) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: number, done: any) => {
  try {
    const user = await getUserById(id);

    done(null, user);
  } catch (err) {
    done(err);
  }
});

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/folders", folderRouter);

app.use("/files", fileRouter);

app.use("/users", userRouter);

app.get("/", ensureAuthenticated, (req: Request, res: Response) => {
  res.render("index");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
