import { NextFunction, Request, Response } from "express";
import { DasboardItemUseCase } from "./Item.js";
import { DashboardItemScheme } from "./scheme.js";

export class DasboardItemController {
  constructor(private dasboardItemUseCase: DasboardItemUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = DashboardItemScheme.validate(req.query);
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
      const { id } = req.query;

      const resultRequest: any = await this.dasboardItemUseCase.handle({
        id: id as string,
      });

      if (resultRequest) {
        return res.status(200).json(resultRequest);
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
