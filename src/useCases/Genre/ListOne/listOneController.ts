import { NextFunction, Request, Response } from "express";
import { ListOneGenresUseCase } from "./listOne.js";
import { searchGenreScheme } from "./shceme.js";

export class ListOneGenreController {
  constructor(private listOneGenresUseCase: ListOneGenresUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = searchGenreScheme.validate(req.query);

    if (error) {
      return res.status(400).json({
        error: "Requisição inválida",
        details: error.message,
      });
    }
    next();
  };
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const query = req.query.query as string;

      const dataGenre = await this.listOneGenresUseCase.execute({
        name: query,
      });

      if (dataGenre) {
        return res.status(200).json(dataGenre);
      } else {
        return res.status(400).json({
          error: "Requisição inválida",
          details:
            "Deve ser informado o nome de um genero, cadastrado no sistema",
        });
      }
    } catch (err: any) {
      return res.status(404).json({
        error: "Requisição inválida",
        details: err.message,
      });
    }
  }
}
