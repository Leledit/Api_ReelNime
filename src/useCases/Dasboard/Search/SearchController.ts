import { NextFunction, Request, Response } from "express";
import { SearchDashboardUseCase } from "./Search.ts";
import { searchDashboardScheme } from "./scheme.ts";

export class SearchDashboarController {
  constructor(private searchDashboardUseCase: SearchDashboardUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = searchDashboardScheme.validate(req.query);
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
      const { search, page, limit } = req.query;

      const resultRequest = await this.searchDashboardUseCase.handle({
        search: search as string,
        page: parseInt(page as string),
        limit: parseInt(limit as string),
      });

      if (resultRequest) {
        return res
          .status(200)
          .setHeader("X-Total-Count", resultRequest.total)
          .json(resultRequest.itens);
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
