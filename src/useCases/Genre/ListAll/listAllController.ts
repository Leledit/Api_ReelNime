import { Request, Response } from "express";
import { ListAllGenresUseCase } from "./listAll.ts";

export class ListAllGenreController {
  constructor(private listAllGenreUseCase: ListAllGenresUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const dataGenres = await this.listAllGenreUseCase.execute();

      return res.status(200).json(dataGenres);
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
