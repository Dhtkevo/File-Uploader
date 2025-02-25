import express from "express";
import {
  showFileUploadForm,
  uploadFilePost,
} from "../controllers/fileController";
import { ensureAuthenticated } from "../auth/auth";
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

export const fileRouter = express.Router();

fileRouter.get("/new", ensureAuthenticated, showFileUploadForm);

fileRouter.post("/new", upload.single("uploaded_file"), uploadFilePost);
