import { NextFunction, Request, Response } from "express";
import { GenerDeleteUseCase } from "./Delete.ts";
import { GenerDeleteScheme } from "./scheme.ts";

export class GenerDeleteController {
  constructor(private generDeleteUseCase: GenerDeleteUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = GenerDeleteScheme.validate(req.params);

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
      await this.generDeleteUseCase.execute({
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
