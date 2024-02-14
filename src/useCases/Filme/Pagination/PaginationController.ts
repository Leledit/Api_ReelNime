import { NextFunction, Request, Response } from "express";
import { FilmePaginationUseCase } from "./Pagination.ts";
import { FilmePaginationControllerScheme } from "./scheme.ts";

export class FilmePaginationController {
  constructor(private filmePaginationUseCase: FilmePaginationUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = FilmePaginationControllerScheme.validate(req.query);

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
      const { page, limit } = req.query;

      const dataFilmes = await this.filmePaginationUseCase.execute({
        limit: parseInt(limit as string),
        page: parseInt(page as string),
      });

      const totalRecords = await this.filmePaginationUseCase.totalRecords();

      if (dataFilmes !== null) {
        return res
          .status(200)
          .setHeader("X-Total-Count", totalRecords)
          .json(dataFilmes);
      } else {
        return res.status(404).json({
          error: "Nenhum registro foi encontrado",
          details: "Nunhum filme foi encontrado no nosso sistema",
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
