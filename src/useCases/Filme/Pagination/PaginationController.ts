import { NextFunction, Request, Response } from "express";
import { PaginationFilmeUseCase } from "./Pagination.ts";
import { paginationFilmeScheme } from "./Scheme.ts";

export class PaginationFilmeController {
  constructor(private paginationFilmeUseCase: PaginationFilmeUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = paginationFilmeScheme.validate(req.query);
    
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
      
      const dataFilmes = await this.paginationFilmeUseCase.execute({
        limit: parseInt(limit as string),
        page: parseInt(page as string),
      });

      if (dataFilmes !== null) {
        return res.status(200).json(dataFilmes);
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
