import express from "express";
import {
  getUserFolders,
  getCreateFolderForm,
  createFolderPost,
} from "../controllers/folderController";

export const folderRouter = express.Router();

folderRouter.get("/", getUserFolders);

folderRouter.get("/new", getCreateFolderForm);

folderRouter.post("/new", createFolderPost);
