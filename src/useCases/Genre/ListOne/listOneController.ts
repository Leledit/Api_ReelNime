import { NextFunction, Request, Response } from "express";
import { ListOneGenresUseCase } from "./listOne.js";
import { searchGenreScheme } from "./shceme.js";

export class ListOneGenreController {
  constructor(private listOneGenresUseCase: ListOneGenresUseCase) {}
  private validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = searchGenreScheme.validate(req.query);

    if (error) {
      return res.status(400).send(error.message);
    }
    next();
  };
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      this.validateRequest(req, res, () => {});
      const query = req.query.query as string;
      
      const dataGenre = await this.listOneGenresUseCase.execute({
        name: query,
      });
      return res.status(200).json(dataGenre);
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
