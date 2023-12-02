import { NextFunction, Request, Response } from "express";
import { DeleteGenresUseCase } from "./Delete.ts";
import { deleteGenreScheme } from "./Scheme.ts";

export class DeleteGenreController {
  constructor(private DeleteGenresUseCase: DeleteGenresUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = deleteGenreScheme.validate(req.params);

    if (error) {
      return res.status(400).json({
        error: "Requisição inválida",
        details: error.message,
      });
    }
    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      await this.DeleteGenresUseCase.execute({
        id: req.params.id,
      });
      return res.status(200).json({
        error: "Exclusão realizada com sucesso",
        details: "O genero foi excluido do sistema",
      });
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
