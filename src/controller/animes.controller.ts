import { Router, Request, Response } from "express";
import Joi from "joi";
import path from "path";
import validationMiddleware from "../middleware/validationMiddleware.ts";
import Utils from "../utils/utils.ts";
import AnimesServices from "../services/animes.services.ts";
import { StorageFirebase } from "../utils/storage/StorageFirebase.ts";
import { MulterConfig } from "../config/multer.ts";
import { returnImageNameBasedOnUrl } from "../utils/storage/returnImageNameBasedOnUrl.ts";
import { interfaceAnimes } from "../models/animes.model.ts";

class AnimesController {
  private router: Router;
  constructor() {
    this.router = Router();
    this.setupRouter();
  }

  private setupRouter() {
    const validationSchemaPost = Joi.object({
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

    const validationSchemaPut = Joi.object({
      id: Joi.string().required(),
      name: Joi.string().required(),
      alreadyAttended: Joi.string().required(),
      qtdEpisodes: Joi.string().required(),
      dateLaunch: Joi.string().required(),
      note: Joi.string().required(),
      status: Joi.string().required(),
      nextSeason: Joi.string().required(),
      prevSeason: Joi.string().required(),
      synopsis: Joi.string().required(),
      oldImageUrl: Joi.string().optional(),
    });

    const validationSchemaGetPage = Joi.object({
      page: Joi.number().required(),
      limit: Joi.number().required(),
    });

    const validationPost = new validationMiddleware(validationSchemaPost);
    const validationPut = new validationMiddleware(validationSchemaPut);
    const validationPage = new validationMiddleware(validationSchemaGetPage);
    const validationGetOneRecord = new validationMiddleware(
      Joi.object({ id: Joi.string().required() })
    );
    this.router.post(
      "/api/v1/animes/",
      MulterConfig.getConfig().single("img"),
      validationPost.validatingTheRequestBody,
      this.postAnimes
    );
    this.router.delete(
      "/api/v1/animes/:id",
      validationGetOneRecord.validatingTheRequestParams,
      this.deleteOneAnime
    );
    this.router.put(
      "/api/v1/animes/",
      MulterConfig.getConfig().single("img"),
      validationPut.validatingTheRequestBody,
      this.alterAnime
    );
    this.router.get("/api/v1/animes/page/",validationPage.validatingTheRequestBody, this.getPageAnime);
    this.router.get("/api/v1/animes/", this.getAllAnimes);
    this.router.get(
      "/api/v1/animes/:id",
      validationGetOneRecord.validatingTheRequestParams,
      this.getAnime
    );
  }

  private async getPageAnime(req: Request, res: Response) {
    try {

      const page = req.body.page;
      const limit = req.body.limit;

      const resultRequest = await AnimesServices.getAllRecords();
      const valueComingFromDb: interfaceAnimes[] = [];
      resultRequest.map((doc) => {
        const dataDoc = doc.data();
        valueComingFromDb.push({
          id: doc.id,
          date: dataDoc.date,
          name: dataDoc.name,
          alreadyAttended: dataDoc.alreadyAttended,
          qtdEpisodes: dataDoc.qtdEpisodes,
          dateLaunch: dataDoc.dateLaunch,
          note: dataDoc.note,
          status: dataDoc.status,
          nextSeason: dataDoc.nextSeason,
          prevSeason: dataDoc.prevSeason,
          synopsis: dataDoc.synopsis,
          urlImg: dataDoc.urlImg,
        });
      });
      let finalValue = page * limit;
      let initialValue = finalValue - limit;
      if (page === 1) {
        initialValue = 0;
        finalValue = limit;
      }

      const valuesToBeReturned: interfaceAnimes[] = [];

      resultRequest.map((doc, index) => {
        const dataDoc = doc.data();
        if (index >= initialValue && index < finalValue) {
          valuesToBeReturned.push({
            id: doc.id,
            date: dataDoc.date,
            name: dataDoc.name,
            alreadyAttended: dataDoc.alreadyAttended,
            qtdEpisodes: dataDoc.qtdEpisodes,
            dateLaunch: dataDoc.dateLaunch,
            note: dataDoc.note,
            status: dataDoc.status,
            nextSeason: dataDoc.nextSeason,
            prevSeason: dataDoc.prevSeason,
            synopsis: dataDoc.synopsis,
            urlImg: dataDoc.urlImg,
          });
        }
      });
      if (valuesToBeReturned.length > 0) {
        res.status(201).json(valuesToBeReturned);
      } else {
        res.status(401).json({ message: "Nenhum anime encontrado" });
      }

      res.status(401).json({ message: "Aplicando teste" });
    } catch (error) {
      console.log("Erro desconhecido ao buscar os animes(paginação)");
    }
  }

  private async alterAnime(req: Request, res: Response) {
    try {
      //Obtendo as informaçoes da imagen(certas de vir na requisição)
      let requestData: interfaceAnimes = {
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
        id: req.body.id,
      };
      let newImg = false;
      if (req.file) {
        newImg = true;
        //Caso tenha imagem, vamos apagar a antiga
        const urlImg = req.body.oldImageUrl || "";
        if (urlImg) {
          //Execluindo a imagem antiga(para adicionar a nova)
          //Obtendo o nome da imagem
          const nameImg = returnImageNameBasedOnUrl.nameImg(urlImg);
          //Deletando a imagem do anime
          const resultOfDeletingTheImg = await StorageFirebase.deleteImg(
            nameImg,
            'animes/'
          );
          if (!resultOfDeletingTheImg) {
            res
              .status(400)
              .json({ message: "Problemas ao excluir a imagem antiga" });
          }
        }
        //Cadastrando a imagem no storage
        const imageBuffer = req.file.buffer;
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + path.extname(req.file.originalname);
        const urlImgAnime = await StorageFirebase.uploadFile(
          imageBuffer,
          filename,
          "animes/"
        );
        requestData = {
          ...requestData,
          urlImg: urlImgAnime,
        };
      }
      //Alterando as informaçoes do anime
      const resultRequest = await AnimesServices.alterOneRecord(
        requestData,
        newImg
      );
      if (resultRequest) {
        res.status(201).json({ message: "Anime alterado com sucesso" });
      } else {
        res.status(400).json({ message: "Problemas ao alterar o anime" });
      }
    } catch (error) {
      console.log("Um erro desconhecido aconteceu: " + error);
      res.status(400).json({ message: "Problemas ao alterar o anime" });
    }
  }

  private async deleteOneAnime(req: Request, res: Response) {
    try {
      const registrySearchResult = await AnimesServices.getOneRecord(
        req.params.id
      );
      if (registrySearchResult) {
        //Obtendo o nome da imagem
        const nameImg = returnImageNameBasedOnUrl.nameImg(
          registrySearchResult.urlImg
        );
        //Deletando a imagem do anime
        await StorageFirebase.deleteImg(nameImg,'animes/');
        //Apagando o anime no firebase
        await AnimesServices.deleteOne(req.params.id);
        res.status(201).json({ message: "Anime excluido com sucesso" });
      } else {
        res
          .status(301)
          .json({ message: "Anime não encontrado, verifique o id" });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Problemas ao executar a ação, erro: " + error });
      console.log(
        "Um erro desconhecido aconteceu ao excluir um anime: " + error
      );
    }
  }

  private async getAnime(req: Request, res: Response) {
    try {
      const resultRequest = await AnimesServices.getOneRecord(req.params.id);
      if (resultRequest) {
        res.status(201).json(resultRequest);
      } else {
        res.status(201).json({ message: "Nenhum anime encontrado!!" });
      }
    } catch (error) {
      console.log(
        "Um erro desconhecido aconteceu ao buscar um anime: " + error
      );
    }
  }

  private async getAllAnimes(req: Request, res: Response) {
    try {
      const resultRequest = await AnimesServices.getAllRecords();
      const valueComingFromDb: {
        id: string;
        name: string;
        alreadyAttended: string;
        qtdEpisodes: string;
        dateLaunch: string;
        note: string;
        status: string;
        nextSeason: string;
        prevSeason: string;
        synopsis: string;
        urlImg: string;
      }[] = [];
      resultRequest.map((doc) => {
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
          urlImg: dataDoc.urlImg,
        });
      });
      if (valueComingFromDb.length > 0) {
        res.json(valueComingFromDb);
      } else {
        res.status(200).json({ message: "Nenhum anime encontrado!!" });
      }
    } catch (error) {
      console.log("Um erro desconhecido aconteceu!: " + error);
    }
  }

  private async postAnimes(req: Request, res: Response) {
    try {
      const resultSearch = await AnimesServices.checkRecordExistence(
        req.body.name
      );
      if (resultSearch) {
        if (req.file) {
          const imageBuffer = req.file.buffer;
          //Gerando nome unico do anime
          const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
          const filename = uniqueSuffix + path.extname(req.file.originalname);
          const urlImgAnime = await StorageFirebase.uploadFile(
            imageBuffer,
            filename,
            "animes/"
          );
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
            urlImg: urlImgAnime,
          };
          await AnimesServices.registerData(dataRequest);
          res.status(201).json({ message: "Cadastro bem-sucedido!" });
        } else {
          console.log("Problemas ao carregar a imagem do anime!!");
        }
      }else{
        res.status(301).json({ message: "Anime ja cadastrado!!" });
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