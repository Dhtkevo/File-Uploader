import { Request, Response } from "express";
import { getFoldersFromUser, createFolderForUser } from "../db/queries";

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
