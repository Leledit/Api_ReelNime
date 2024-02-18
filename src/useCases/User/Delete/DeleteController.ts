import { NextFunction, Request, Response } from "express";
import { UserDeleteUseCase } from "./Delete.ts";
import { UserDeleteScheme } from "./scheme.ts";

export class UserDeleteController {
  constructor(private filmeDeleteUseCase: UserDeleteUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = UserDeleteScheme.validate(req.params);

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
      await this.filmeDeleteUseCase.execute({ id: req.params.id });
      return res.status(200).json({
        message: "Exclusão realizada com sucesso",
        details: "O usuario foi excluido do sistema",
      });
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
