import { Request, Response } from "express";
import { DasboardPopularUseCase } from "./Popular.ts";

export class DasboardPopularController {
  constructor(private dasboardPopularUseCase: DasboardPopularUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const dataPopular = await this.dasboardPopularUseCase.execute();
      return res.status(200).json(dataPopular);
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
