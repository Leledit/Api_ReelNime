import { Request, Response } from "express";
import { DeleteAnimeUseCase } from "./Delete.ts";

export class DeleteAnimeController {
  constructor(private deleteAnimeUseCase: DeleteAnimeUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      await this.deleteAnimeUseCase.execute({ id: req.params.id });
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
