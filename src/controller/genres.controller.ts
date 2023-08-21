import { Router, Request, Response } from "express";
import Joi from "joi";
import validationMiddleware from "../middleware/validationMiddleware.ts";
import Utils from "../utils/utils.ts";
import { InterfaceGenres } from "../models/genres.model.ts";
import GenresServices from "../services/genres.services.ts";

class GenresController {
  private genresServices: GenresServices;
  private router: Router;

  constructor() {
    this.genresServices = new GenresServices();
    this.router = Router();
    this.setupRouter();
  }

  private setupRouter() {
    //Criando objetos de validação
    const validationSchema = Joi.object({
      nameGenre: Joi.string().required(),
    });
    const validationSchemaSearch = Joi.object({
      query: Joi.string().required(),
    });

    //Criando a instancia do middleware de validação.
    const validation = new validationMiddleware(validationSchema);
    const validationSearch = new validationMiddleware(validationSchemaSearch);

    this.router.post(
      "/api/v1/genres/",
      validation.validatingTheRequestBody,
      this.postgenres
    );

    this.router.get(
      "/api/v1/genres/search",
      validationSearch.validatingTheRequestQuery,
      this.getSearch
    );
    this.router.get("/api/v1/genres/", this.getAllgenres);
    this.router.put(
      "/api/v1/genres/:id",
      validation.validatingTheRequestQuery,
      this.putUpdateRecord
    );
    this.router.delete("/api/v1/genres/:id", this.deleteARecord);
  }

  private async postgenres(req: Request, res: Response) {
    try {
      const existingRecord = await GenresServices.checkRecordExistence(
        req.body.nameGenre
      );
      if (!existingRecord) {
        const data: InterfaceGenres = {
          nameGenre: req.body.nameGenre,
          date: Utils.returnCurrentDate(),
        };
        const resultRequest = await GenresServices.registerData(data);
        if (resultRequest.acknowledged === true) {
          res.status(201).json({ message: "Cadastro bem-sucedido!" });
        } else {
          res.status(401).json({ message: "Problemas ao realizar o cadastro" });
        }
      } else {
        res.status(300).json({ error: "Gênero ja cadastrado no sistemas!." });
      }
    } catch (error) {
      console.log(error);
    }
  }

  private async getAllgenres(req: Request, res: Response) {
    try {
      const dataRequest = await GenresServices.getAllRecords();
      let valueComingFromDb: {
        id: string;
        name: string;
      }[] = [];
      dataRequest.map((doc: any) => {
        valueComingFromDb.push({
          id: doc._id,
          name: doc.nameGenre,
        })
      });
      if (valueComingFromDb.length > 0) {
        res.json(valueComingFromDb);
      } else {
        res.status(200).json({ message: "Nenhum genero encontrado!!" });
      }
    } catch (error) {
      console.log("Um erro desconhecido aconteceu: " + error);
    }
  }

  private async deleteARecord(req: Request, res: Response) {
    try {
      const resultRequest = await GenresServices.deleteARecord(req.params.id);
      if(resultRequest.deletedCount>0){
        res.status(200).json({ message: "Registro deletado com sucesso" });
      }else{
        res.status(400).json({ message: "Problemas ao excluir o resgitros" });
      }
    } catch (error) {
      console.log("Um erro desconhecido aconteceu: " + error);
    }
  }

  private async putUpdateRecord(req: Request, res: Response) {
    try {
      const dataReq: InterfaceGenres = {
        nameGenre: req.query.nameGenre as string,
        date: Utils.returnCurrentDate(),
      };
      const resultRequest = await GenresServices.putUpdateRecord(req.params.id, dataReq);
      if(resultRequest.modifiedCount>=1){
        res.status(200).json({ message: "Registro atualizado com sucesso" });
      }else{
        res.status(400).json({ message: "Problemas ao atualizar o registro" });
      }
    } catch (error) {
      console.log("Um erro desconhecido aconteceu: " + error);
    }
  }

  private async getSearch(req: Request, res: Response) {
    try {
      const dataRequest = await GenresServices.search(
        req.query.query as string
      );
      console.log(dataRequest);
      let valueComingFromDb: {
        id: string;
        name: string;
      }[] = [];
      dataRequest.map((doc: any) => {
        valueComingFromDb.push({
          id: doc._id,
          name: doc.nameGenre,
        });
      });
      if (valueComingFromDb.length > 0) {
        res.json(valueComingFromDb);
      } else {
        res.status(200).json({ message: "Nenhum genero encontrado" });
      }
    } catch (error) {
      console.log("Um erro desconhecido aconteceu: " + error);
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
export default GenresController;