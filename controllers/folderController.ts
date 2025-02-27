import { Request, Response } from "express";
import {
  getFoldersFromUser,
  createFolderForUser,
  updateFolder,
  deleteFolder,
} from "../db/queries";

export const getUserFolders = async (req: Request, res: Response) => {
  const user = res.locals.currentUser;
  const folders = await getFoldersFromUser(user.id);
  res.render("allUserFolders", { folders });
};

export const getCreateFolderForm = (req: Request, res: Response) => {
  res.render("createFolder");
};

export const createFolderPost = async (req: Request, res: Response) => {
  const folder = await createFolderForUser(
    res.locals.currentUser.id,
    req.body.folderName
  );
  res.redirect("/folders");
};

export const getUpdateFolderForm = (req: Request, res: Response) => {
  res.render("updateFolder");
};

export const updateFolderPost = async (req: Request, res: Response) => {
  const updatedFolder = await updateFolder(
    req.body.folderName,
    req.body.newFolderName
  );
  res.redirect("/folders");
};

export const getDeleteFolderForm = (req: Request, res: Response) => {
  res.render("deleteFolder");
};

export const deleteFolderPost = async (req: Request, res: Response) => {
  await deleteFolder(req.body.folderName);
  res.redirect("/folders");
};
