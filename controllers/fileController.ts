import { Request, Response } from "express";
import multer from "multer";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

export const showFileUploadForm = (req: Request, res: Response) => {
  res.render("fileupload");
};

export const uploadFilePost = (req: Request, res: Response) => {
  console.log(req.file);
};
