import { NextFunction, Request, Response } from "express";
import { DeleteFilmeUseCase } from "./Delete.ts";
import { deleteFilmeScheme } from "./Scheme.ts";

export class DeleteFilmeController {
  constructor(private deleteFilmeUseCase: DeleteFilmeUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = deleteFilmeScheme.validate(req.params);

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
      await this.deleteFilmeUseCase.execute({ id: req.params.id });
      return res.status(200).json({
        message: "Exclusão realizada com sucesso",
        details: "O filme foi excluido do sistema",
      });
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
