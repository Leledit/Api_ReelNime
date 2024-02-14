import { Request, Response } from "express";
import { FilmeListAllUseCase } from "./ListAll.ts";

export class FilmeListAllController {
  constructor(private filmeListAllUseCase: FilmeListAllUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const dataFilmes = await this.filmeListAllUseCase.execute();
      return res.status(200).json(dataFilmes);
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
