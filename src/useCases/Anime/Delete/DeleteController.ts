import { Request, Response } from "express";
import { AnimeDeleteUseCase } from "./Delete.ts";

export class AnimeDeleteController {
  constructor(private animeDeleteUseCase: AnimeDeleteUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      await this.animeDeleteUseCase.execute({ id: req.params.id });
      return res.status(200).json({
        message: "Exclusão realizada com sucesso",
        details: "O anime foi excluido do sistema",
      });
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
