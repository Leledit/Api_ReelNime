import { Request, Response } from "express";
import { ListAllFilmeUseCase } from "./ListAll.ts";

export class ListAllFilmeController {
  constructor(private listAllFilmeUseCase: ListAllFilmeUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const dataFilmes = await this.listAllFilmeUseCase.execute();
      return res.status(201).json(dataFilmes);
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
