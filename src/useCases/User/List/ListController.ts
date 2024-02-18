import { NextFunction, Request, Response } from "express";
import { UserListUseCase } from "./List.ts";
import { UserListScheme } from "./scheme.ts";

export class UserListController {
  constructor(private userListUseCase: UserListUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = UserListScheme.validate(req.query);

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
      const { email } = req.query;

      const resultUser = await this.userListUseCase.execute({
        email: email as string,
      });

      if (resultUser) {
        return res.status(200).json(resultUser);
      } else {
        return res.status(500).json({
          error: "Usuario não encontrado!",
          details: "nenhum usuario foi encontrado com o email informado!",
        });
      }
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
