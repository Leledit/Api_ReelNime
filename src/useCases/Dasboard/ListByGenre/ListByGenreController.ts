import { NextFunction, Request, Response } from "express";
import { ListByGenreDasboardUseCase } from "./ListByGenre.js";
import { listByGenreDashboardScheme } from "./scheme.js";

export class ListByGenreController {
  constructor(private listByGenreDasboardUseCase: ListByGenreDasboardUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = listByGenreDashboardScheme.validate(req.query);
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
      const { page, limit, genre } = req.query;

      const resultRequest:any = await this.listByGenreDasboardUseCase.handle({
        limit: parseInt(limit as string),
        page: parseInt(page as string),
        genre: genre as string,
      });

      if (resultRequest) {
        return res.status(200).setHeader("X-Total-Count", resultRequest.total).json(resultRequest.itens);
      } else {
        return res.status(500).json({
          error: "Recurso não encontrado",
          details: "Nenhum titulo foi encontrado!",
        });
      }
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
