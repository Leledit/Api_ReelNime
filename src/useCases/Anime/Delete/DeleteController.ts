import { Request, Response } from "express";
import { DeleteAnimeUseCase } from "./Delete.ts";

export class DeleteAnimeController {
  constructor(private deleteAnimeUseCase: DeleteAnimeUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      await this.deleteAnimeUseCase.execute({ id: request.params.id });
      return response.status(201).send("Anime deletado com sucesso!");
    } catch (err: any) {
      return response.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
