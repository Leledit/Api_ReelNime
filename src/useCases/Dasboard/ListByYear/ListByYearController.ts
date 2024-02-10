import { NextFunction, Request, Response } from "express";
import { ListByYearDasboardUseCase } from "./ListByYear.js";
import { litsByYearDashboardScheme } from "./scheme.js";

export class ListByYearController {
  constructor(private listByYearDasboardUseCase: ListByYearDasboardUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = litsByYearDashboardScheme.validate(req.query);
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
      const { page, limit, year } = req.query;

      const resultRequest:any = await this.listByYearDasboardUseCase.handle({
        limit: parseInt(limit as string),
        page: parseInt(page as string),
        year: parseInt(year as string),
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
