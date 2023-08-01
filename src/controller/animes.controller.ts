import { Router, Request, Response } from "express";
import Joi from "joi";
import fs from "fs";
import validationMiddleware from "../middleware/validationMiddleware.ts";
import Utils from "../utils/utils.ts";
import { UploadConfig } from "../config/upload.ts";
import AnimesServices from "../services/animes.services.ts";

class AnimesController {
  private router: Router;
  constructor() {
    this.router = Router();
    this.setupRouter();
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
    this.router.post(
      "/api/v1/animes/",
      UploadConfig.uplodImgAnime(),
      validation.validatingTheRequestBody,
      this.postAnimes
    );
    this.router.get("/api/v1/animes/", this.getAllAnimes);
  }

  private async getAllAnimes(req: Request, res: Response) {
    try {
      const resultRequest = await AnimesServices.getAllRecords();
      const valueComingFromDb: {
        id: string,
        name: string,
        alreadyAttended: string,
        qtdEpisodes: string,
        dateLaunch: string,
        note: string,
        status: string,
        nextSeason: string,
        prevSeason: string,
        synopsis: string,
      }[] = []
      resultRequest.map((doc)=>{
        const dataDoc = doc.data();
        valueComingFromDb.push({
          id: doc.id,
          name: dataDoc.name,
          alreadyAttended: dataDoc.alreadyAttended,
          qtdEpisodes: dataDoc.qtdEpisodes,
          dateLaunch: dataDoc.dateLaunch,
          note: dataDoc.note,
          status: dataDoc.status,
          nextSeason: dataDoc.nextSeason,
          prevSeason: dataDoc.prevSeason,
          synopsis: dataDoc.synopsis,
        });
      })
      if (valueComingFromDb.length > 0) {
        res.json(valueComingFromDb);
      } else {
        res.status(200).json({ message: "Nenhum anime encontrado!!" });
      }
    } catch (error) {
      console.log("Um erro desconhecido aconteceu!");
    }
  }

  private async postAnimes(req: Request, res: Response) {
    try {
      const resultSearch = await AnimesServices.checkRecordExistence(
        req.body.name
      );
      if (resultSearch) {
        const dataRequest = {
          date: Utils.returnCurrentDate(),
          name: req.body.name,
          alreadyAttended: req.body.alreadyAttended,
          qtdEpisodes: req.body.qtdEpisodes,
          dateLaunch: req.body.dateLaunch,
          note: req.body.note,
          status: req.body.status,
          nextSeason: req.body.nextSeason,
          prevSeason: req.body.prevSeason,
          synopsis: req.body.synopsis,
          urlImg: "/files/animes/" + req.file?.filename,
        };
        await AnimesServices.registerData(dataRequest);
        res.status(201).json({ message: "Cadastro bem-sucedido!" });
      } else {
        //Excluindo arquivo
        fs.unlink(
          `${Utils.returnApplicationPath("../uploadedFiles/animes")}/${
            req.file?.filename
          }`,
          () => {}
        );
        res.status(301).json({ message: "Anime ja cadastrado" });
      }
    } catch (error) {
      console.log("Um erro desconhecido aconteceu: " + error);
    }
    res.send();
  }
  public getRouter(): Router {
    return this.router;
  }
}
export default AnimesController;
