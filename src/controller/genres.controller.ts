import { Router, Request, Response } from "express";
import Joi from "joi";
import validationMiddleware from "../middleware/validationMiddleware.ts";
import Utils from "../utils/utils.ts";
import GenresServices from "../services/genres.services.ts";
import { InterfaceGenres } from "../models/genres.model.ts";

class GenresController {
  private router: Router;
  constructor() {
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

  private async deleteARecord(req: Request, res: Response) {
    try {
      await GenresServices.deleteARecord(req.params.id);
      res.status(200).json({ message: "Registro deletado com sucesso" });
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
      await GenresServices.putUpdateRecord(req.params.id, dataReq);
      res.status(200).json({ message: "Registro atualizado com sucesso" });
    } catch (error) {
      console.log("Um erro desconhecido aconteceu: " + error);
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
          id: doc.id,
          name: doc.data().nameGenre,
        });
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

  private async getSearch(req: Request, res: Response) {
    try {
      const dataRequest = await GenresServices.search(
        req.query.query as string
      );
      let valueComingFromDb: {
        id: string;
        name: string;
      }[] = [];
      dataRequest.map((doc: any) => {
        valueComingFromDb.push({
          id: doc.id,
          name: doc.data().nameGenre,
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

  private async postgenres(req: Request, res: Response) {
    try {
      const existingRecord = await GenresServices.checkRecordExistence(
        req.body.nameGenre
      );
      if (existingRecord) {
        const data: InterfaceGenres = {
          nameGenre: req.body.nameGenre,
          date: Utils.returnCurrentDate(),
        };
        await GenresServices.registerData(data);
        res.status(201).json({ message: "Cadastro bem-sucedido!" });
      } else {
        res.status(300).json({ error: "Gênero ja cadastrado no sistemas!." });
      }
    } catch (error) {
      console.log(error);
    }
  }

  public getRouter(): Router {
    return this.router;
  }
}
export default GenresController;
