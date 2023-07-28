import { fileURLToPath } from 'url';
import path,{dirname} from 'path';
import multer from 'multer';
import { Router, Request, Response } from "express";
export class UploadConfig{
    static uplodImgAnime(){
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const storage = multer.diskStorage({
            destination: path.join(__dirname, '../uploadedFiles/animes'),
            filename: (req, file, cb) => {
              // Gera um nome único para o arquivo para evitar conflitos
              const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
              const filename = uniqueSuffix + path.extname(file.originalname);
              cb(null, filename);
            }
        });
        return multer({ storage }).single('img');
    }
}


  

/**
 * 
 * 
 * 
 */

   