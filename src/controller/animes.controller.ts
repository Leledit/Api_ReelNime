import { Router, Request, Response } from "express";
import Joi from "joi";
import multer from "multer";
import  path ,{ dirname, join } from 'path';

import validationMiddleware from "../middleware/validationMiddleware.ts";
import Utils from "../utils/utils.ts";
import { UploadConfig } from "../config/upload.ts";



class AnimesController {
  private router: Router;
  constructor() {
    this.router = Router();
    this.setupRouter()
  }
  private setupRouter() {
    const validationSchema = Joi.object({
      name: Joi.string().required(),
      alreadyAttended: Joi.string().required(),
      qtdEpisodes: Joi.string().required(),
      dateLaunch: Joi.string().required(),
      note: Joi.string().required(),
      status: Joi.string().required(),
      nextSeason: Joi.string().optional(),
      prevSeason: Joi.string().optional(),
      synopsis: Joi.string().required(),
    });

    const validation = new validationMiddleware(validationSchema);
    this.router.post("/api/v1/animes/",UploadConfig.uplodImgAnime(),validation.validatingTheRequestBody,this.postAnimes);
  }
 
  private async postAnimes(req: Request, res: Response) {
    console.log("Aquivo enviado com sucesso!");
    res.send()
  }
  public getRouter(): Router {
    return this.router;
  }
}
export default AnimesController;