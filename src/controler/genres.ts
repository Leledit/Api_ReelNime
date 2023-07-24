import { Router, Request, Response } from "express";
import Joi from "joi";
import validationMiddleware from "../middleware/validationMiddleware.ts";

class genres {
  private router: Router;

  constructor() {

    this.router = Router();
    this.setupRouter();
  }

  private setupRouter() {
    //Criando objeto de validação
    const validationSchema = Joi.object({
        name: Joi.string().required(),
    });
    //Criando a instancia do middleware de validação.
    const validation = new validationMiddleware(validationSchema);
    this.router.post("/api/v1/genres/",validation.validate, this.postgenres);
  }

  private postgenres(req: Request, res: Response) {
    console.log("Ola mundo")
    res.json();
  }

  public getRouter(): Router {
    return this.router;
  }
}
export default genres;
