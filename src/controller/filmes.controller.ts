import { Router, Request, Response } from "express";
import Joi from "joi";
import validationMiddleware from "../middleware/validationMiddleware.ts";
import Utils from "../utils/utils.ts";
import { MulterConfig } from "../config/multer.ts";
import path from "path";
import { StorageFirebase } from "../utils/storage/StorageFirebase.ts";
import FilmesService from "../services/filmes.services.ts";
import { interfaceFilme } from "../models/filmes.model.ts";
import { returnImageNameBasedOnUrl } from "../utils/storage/returnImageNameBasedOnUrl.ts";
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
    const validationSchemaPut = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      visa: Joi.string().required(),
      duration: Joi.string().required(),
      lauch: Joi.string().required(),
      note: Joi.string().required(),
      synopsis: Joi.string().required(),
      oldImageUrl: Joi.string().optional(),
    });
    const validationSchemaId = Joi.object({
      id: Joi.string().required(),
    });
    const validationSchemaSearch = Joi.object({
      param: Joi.string().required(),
    })
  
    const validationPost = new validationMiddleware(validationSchemaPost);
    const validationId = new validationMiddleware(validationSchemaId);
    const validationPut = new validationMiddleware(validationSchemaPut);
    const valitationSearch = new validationMiddleware(validationSchemaSearch);
    //Definindo as rotas relacionadas a esse segmento
    this.router.post(
      "/api/v1/filmes/",
      MulterConfig.getConfig().single("img"),
      validationPost.validatingTheRequestBody,
      this.postFilmes
    );
    this.router.get("/api/v1/filmes/", this.getAllFilmes);
    this.router.delete(
      "/api/v1/filmes/:id",
      validationId.validatingTheRequestParams,
      this.deleteOneFilme
    );
    this.router.get(
      "/api/v1/filmes/:id",
      validationId.validatingTheRequestParams,
      this.getOneAnime
    );
    this.router.put(
      "/api/v1/filmes/",
      MulterConfig.getConfig().single("img"),
      validationPut.validatingTheRequestBody,
      this.putOneAnime
    );
    this.router.get("/api/v1/filmes/search/:param",valitationSearch.validatingTheRequestParams,this.getSearchFilme);
  }

  private async getSearchFilme(req: Request, res: Response) {
    try{
      const requestParam =  req.params.param;
      const resultRequest =  await FilmesService.getSearchFilme(requestParam);
      resultRequest.map((doc)=>{
        console.log(doc.data());
      })
      console.log(resultRequest);
      res.status(201).json({ message: "Estou buscando os filmes e tals" });
    }catch(error){
      console.log("Um erro desconhecido aconteceu: " + error);
    }
  }

  private async putOneAnime(req: Request, res: Response) {
    try {
      let requestBody: interfaceFilme = {
        id: req.body.id,
        date: Utils.returnCurrentDate(),
        name: req.body.name,
        visa: req.body.visa,
        duration: req.body.duration,
        lauch: req.body.lauch,
        note: req.body.note,
        synopsis: req.body.synopsis,
        oldImageUrl: req.body.oldImageUrl,
        img: req.body.oldImageUrl,
      };
      if (req.file) {
        //Caso tenha imagem, vamos apagar a antiga
        const urlImg = req.body.oldImageUrl || "";

        if (urlImg) {
          //Execluindo a imagem antiga(para adicionar a nova)
          //Obtendo o nome da imagem
          const nameImg = returnImageNameBasedOnUrl.nameImg(urlImg);
          //Deletando a imagem do anime
          const resultOfDeletingTheImg = await StorageFirebase.deleteImg(
            nameImg,
            "filmes/"
          );
          if (!resultOfDeletingTheImg) {
            res
              .status(400)
              .json({ message: "Problemas ao excluir a imagem antiga(filme)" });
          } else {
            //Cadastrando a imagem no storage
            const imageBuffer = req.file.buffer;
            const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
            const filename = uniqueSuffix + path.extname(req.file.originalname);
            const urlImgAnime = await StorageFirebase.uploadFile(
              imageBuffer,
              filename,
              "filmes/"
            );
            requestBody = {
              ...requestBody,
              img: urlImgAnime,
            };
          }
        }
      }
      const resultRequest = await FilmesService.alterOneRecord(requestBody);
      console.log(requestBody)
      if (resultRequest) {
        res.status(201).json({ message: "Filme alterado com sucesso" });
      } else {
        res.status(400).json({ message: "Problemas ao alterar o filme" });
      }
      //res.status(201).json({ message: "Anime alterado com sucesso" });
    } catch (error) {
      console.log("Um erro desconhecido aconteceu: " + error);
    }
  }

  private async getOneAnime(req: Request, res: Response) {
    try {
      const registrySearchResult = await FilmesService.getOneRecord(
        req.params.id
      );
      res.status(201).json(registrySearchResult);
    } catch (error) {
      console.log("Um erro desconhecido aconteceu: " + error);
    }
  }

  private async deleteOneFilme(req: Request, res: Response) {
    try {
      const registrySearchResult = await FilmesService.getOneRecord(
        req.params.id
      );
      if (registrySearchResult) {
        //Obtendo o nome da imagem
        const nameImg = returnImageNameBasedOnUrl.nameImg(
          registrySearchResult.imgUrl
        );
        //Deletando a imagem do anime
        await StorageFirebase.deleteImg(nameImg, "filmes/");
        //Apagando o anime no firebase
        await FilmesService.deleteOne(req.params.id);
        res.status(201).json({ message: "Filme excluido com sucesso" });
      }
    } catch (error) {
      console.log("Um erro desconhecido aconteceu: " + error);
    }
  }

  private async getAllFilmes(req: Request, res: Response) {
    try {
      const dataRequest = await FilmesService.getAllRecords();
      let dataComingFromTheDb: interfaceFilme[] = [];
      dataRequest.map((doc) => {
        const data = doc.data();
        dataComingFromTheDb.push({
          id: doc.id,
          name: data.name,
          visa: data.visa,
          duration: data.duration,
          lauch: data.lauch,
          note: data.note,
          synopsis: data.synopsis,
          img: data.imgUrl,
          date: data.date,
        });
      });
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
      } else {
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
