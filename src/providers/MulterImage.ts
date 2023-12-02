import multer from "multer";
import { Request } from "express";

export interface UploadedFile {
  buffer: Buffer;
  fieldname: string;
  mimetype: string;
  originalname: string;
  size: number;
}

const storage = multer.memoryStorage(); // Configuração de armazenamento do Multer

const upload = multer({ storage: storage });

export const singleFileUpload = (fieldName: string) => {
  return upload.single(fieldName);
};

export const getFileFromRequest = (req: Request): UploadedFile | undefined => {
  const file = req.file;
  if (file) {
    return {
      buffer: file.buffer,
      fieldname: file.fieldname,
      mimetype: file.mimetype,
      originalname: file.originalname,
      size: file.size,
    };
  }
  return undefined;
};