import { Request, Response } from "express";
import { ListAllGenresUseCase } from "./listAll.ts";

export class ListAllGenreController {
  constructor(private listAllGenreUseCase: ListAllGenresUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const dataGenres = await this.listAllGenreUseCase.execute();

      return response.status(200).json(dataGenres);
    } catch (err: any) {
      return response.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
