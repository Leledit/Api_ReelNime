import { NextFunction, Request, Response } from "express";
import { AnimePaginationUseCase } from "./Pagination.ts";
import { AnimePaginationScheme } from "./scheme.ts";

export class AnimePaginationController {
  constructor(private animePaginationUseCase: AnimePaginationUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = AnimePaginationScheme.validate(req.query);

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

      const dataAnimes = await this.animePaginationUseCase.execute({
        limit: parseInt(limit as string),
        page: parseInt(page as string),
      });

      const totalRecords = await this.animePaginationUseCase.totalRecords();

      if (dataAnimes === null) {
        return res.status(404).json({
          error: "Nenhum registro foi encontrado",
          details: "Nenhum anime foi encontrado no nosso sistema",
        });
      } else {
        return res
          .status(200)
          .setHeader("X-Total-Count", totalRecords)
          .json(dataAnimes);
      }
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
