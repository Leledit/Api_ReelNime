import { NextFunction, Request, Response } from "express";
import { PaginationAnimeUseCase } from "./Pagination.ts";
import { paginationAnimeScheme } from "./scheme.ts";

export class PaginationAnimeController {
  constructor(private paginationAnimeUseCase: PaginationAnimeUseCase) {}

  validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = paginationAnimeScheme.validate(req.query);

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

      const dataAnimes = await this.paginationAnimeUseCase.execute({
        limit: parseInt(limit as string),
        page: parseInt(page as string),
      });

      const totalRecords = await this.paginationAnimeUseCase.totalRecords();

      if(dataAnimes === null){
        return res.status(404).json({
          error: "Nenhum registro foi encontrado",
          details: "Nenhum anime foi encontrado no nosso sistema",
        });
      }else{
        return res.status(200).setHeader('X-Total-Count',totalRecords).json(dataAnimes);
      }

    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
