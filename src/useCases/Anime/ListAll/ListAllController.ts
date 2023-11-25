import { Request, Response } from "express";
import { ListAllAnimesUseCase } from "./ListAll.ts";

export class ListAllAnimeController {
  constructor(private listaAllAnimesUseCase: ListAllAnimesUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const dataAnimes = await this.listaAllAnimesUseCase.execute();
      return res.status(201).json(dataAnimes);
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
