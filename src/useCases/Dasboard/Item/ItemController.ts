import { NextFunction, Request, Response } from "express";
import { ItemDasboardUseCase } from "./Item.js";
import { itemDashboardScheme } from "./scheme.js";

export class ItemDashboardController {
  constructor(private itemDasboardUseCase: ItemDasboardUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = itemDashboardScheme.validate(req.query);
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

      const resultRequest:any = await this.itemDasboardUseCase.handle({
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
