import { Request, Response } from "express";
import { GenerListAllUseCase } from "./ListAll.js";

export class GenerListAllController {
  constructor(private generListAllUseCase: GenerListAllUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const dataGenres = await this.generListAllUseCase.execute();

      return res.status(200).json(dataGenres);
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
