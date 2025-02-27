import express from "express";
import {
  getUserFolders,
  getCreateFolderForm,
  createFolderPost,
  getUpdateFolderForm,
  updateFolderPost,
  getDeleteFolderForm,
  deleteFolderPost,
} from "../controllers/folderController";

export const folderRouter = express.Router();

folderRouter.get("/", getUserFolders);

folderRouter.get("/new", getCreateFolderForm);

folderRouter.post("/new", createFolderPost);

folderRouter.get("/update", getUpdateFolderForm);

folderRouter.post("/update", updateFolderPost);

folderRouter.get("/delete", getDeleteFolderForm);

folderRouter.post("/delete", deleteFolderPost);
