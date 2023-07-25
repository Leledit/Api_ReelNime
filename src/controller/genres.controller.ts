import { Router, Request, Response } from "express";
import Joi from "joi";
import validationMiddleware from "../middleware/validationMiddleware.ts";
import Utils from "../utils/utils.ts";
import GenresServices from "../services/genres.services.ts";
import { InterfacePostGenres } from "../models/genres.model.ts";

class GenresController {
  private router: Router;
  constructor() {
    this.router = Router();
    this.setupRouter();
  }

  private setupRouter() {
    
    //Criando objeto de validação
    const validationSchemaPost = Joi.object({
      nameGenre: Joi.string().required(),
    });

    const validationSchemaQuey = Joi.object({
      query: Joi.string().required(),
    });
    
    //Criando a instancia do middleware de validação.
    const validationPost = new validationMiddleware(validationSchemaPost);
    const validationQuery = new validationMiddleware(validationSchemaQuey);

    this.router.post("/api/v1/genres/", validationPost.validatingTheRequestBody, this.postgenres);
    this.router.get("/api/v1/genres/:query",validationQuery.validatingTheRequestParams,this.getSearch);
  }

  private async getSearch(req: Request, res: Response) {
      console.log(req.params);
      res.send();
  }

  private async postgenres(req: Request, res: Response) {
    try {
      const existingRecord = await GenresServices.checkRecordExistence(
        req.body.nameGenre
      );
      if (existingRecord) {
        const data: InterfacePostGenres = {
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
