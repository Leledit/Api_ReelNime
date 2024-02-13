import { Request, Response } from "express";
import { AnimeListAllUseCase } from "./ListAll.ts";

export class AnimeListAllController {
  constructor(private animeListAllUseCase: AnimeListAllUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const dataAnimes = await this.animeListAllUseCase.execute();
      return res.status(200).json(dataAnimes);
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
