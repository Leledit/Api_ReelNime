import { NextFunction, Request, Response } from "express";
import { DasboardPopularUseCase } from "./Popular.ts";
import { DasboardPopularScheme } from "./scheme.ts";

export class DasboardPopularController {
  constructor(private dasboardPopularUseCase: DasboardPopularUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = DasboardPopularScheme.validate(req.query);
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
      const { limit } = req.query;
      const dataPopular = await this.dasboardPopularUseCase.execute({
        limit: parseInt(limit as string),
      });
      return res.status(200).json(dataPopular);
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
