import { Request, Response } from "express";
import { ListAllFilmeUseCase } from "./ListAll.ts";

export class ListAllFilmeController {
  constructor(private listAllFilmeUseCase: ListAllFilmeUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const dataFilmes = await this.listAllFilmeUseCase.execute();
      return response.status(201).json(dataFilmes);
    } catch (err: any) {
      return response.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
