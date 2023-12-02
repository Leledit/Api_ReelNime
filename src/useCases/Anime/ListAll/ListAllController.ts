import { Request, Response } from "express";
import { ListAllAnimesUseCase } from "./ListAll.ts";

export class ListAllAnimeController {
  constructor(private listaAllAnimesUseCase: ListAllAnimesUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const dataAnimes = await this.listaAllAnimesUseCase.execute();
      return res.status(200).json(dataAnimes);
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
