import { Router, Request, Response } from "express";
import Joi from "joi";
import validationMiddleware from "../middleware/validationMiddleware.ts";
import Utils from "../utils/utils.ts";
import { MulterConfig } from "../config/multer.ts";
import path from "path";
import { StorageFirebase } from "../utils/storage/StorageFirebase.ts";
import FilmesService from "../services/filmes.services.ts";
import { interfaceFilme } from "../models/filmes.model.ts";
class FilmeController {
  private router: Router;
  constructor() {
    this.router = Router();
    this.setupRouter();
  }

  private setupRouter() {
    //Criando validaçoes no lado do servidor
    const validationSchemaPost = Joi.object({
      name: Joi.string().required(),
      visa: Joi.string().required(),
      duration: Joi.string().required(),
      lauch: Joi.string().required(),
      note: Joi.string().required(),
      synopsis: Joi.string().required(),
    });
    const validationPost = new validationMiddleware(validationSchemaPost);
    //Definindo as rotas relacionadas a esse segmento
    this.router.post(
      "/api/v1/filmes/",
      MulterConfig.getConfig().single("img"),
      validationPost.validatingTheRequestBody,
      this.postFilmes
    );
    this.router.get("/api/v1/filmes/",this.getAllFilmes);
  }

  private async getAllFilmes(req: Request, res: Response) {
    try {
      const dataRequest = await FilmesService.getAllRecords();
      let dataComingFromTheDb:interfaceFilme[] = []
      dataRequest.map((doc)=>{
        const data = doc.data()
        dataComingFromTheDb.push({
          id:doc.id,
          name:data.name,
          visa:data.visa,
          duration:data.duration,
          lauch:data.lauch,
          note:data.note,
          synopsis:data.synopsis,
          img:data.imgUrl,
          date:data.date,
        })
      })
      res.status(201).json(dataComingFromTheDb);
    } catch (error) {
      console.log("Um erro desconhecido aconteceu: " + error);
    }
  }

  private async postFilmes(req: Request, res: Response) {
    try {
      const resultSearch = await FilmesService.checkRecordExistence(
        req.body.name
      );
      if (resultSearch) {
        if (req.file) {
          const imageBuffer = req.file.buffer;
          //Cadastrando uma imagem do filme
          const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
          const filename = uniqueSuffix + path.extname(req.file.originalname);
          const urlImgAnime = await StorageFirebase.uploadFile(
            imageBuffer,
            filename,
            "filmes/"
          );
          const dataRequest = {
            date: Utils.returnCurrentDate(),
            name: req.body.name,
            visa: req.body.visa,
            duration: req.body.duration,
            lauch: req.body.lauch,
            note: req.body.note,
            synopsis: req.body.synopsis,
            imgUrl: urlImgAnime,
          };
          await FilmesService.postFilmes(dataRequest);
          res.status(201).json({ message: "Cadastro bem-sucedido!" });
        }
      }else{
        res.status(301).json({ message: "Filme ja cadastrado" });
      }
    } catch (error) {
      console.log("Um erro desconhecido aconteceu: " + error);
    }
  }
  public getRouter(): Router {
    return this.router;
  }
}

export default FilmeController;
