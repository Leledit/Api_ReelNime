import { Request, Response } from "express";
import { ListAllAnimesUseCase } from "./ListAll.ts";

export class ListAllAnimeController {
  constructor(private listaAllAnimesUseCase: ListAllAnimesUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const dataAnimes = await this.listaAllAnimesUseCase.execute();
      return response.status(201).json(dataAnimes);
    } catch (err: any) {
      return response.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
