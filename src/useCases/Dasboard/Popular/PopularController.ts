import { Request, Response } from "express";
import { PopularUseCase } from "./Popular.ts";

export class PopularController {
  constructor(private popularUseCase: PopularUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
        const dataPopular = await this.popularUseCase.execute();
        return res.status(200).json(dataPopular);
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}