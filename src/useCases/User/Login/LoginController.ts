import { NextFunction, Request, Response } from "express";
import { UserLoginUseCase } from "./Login.ts";
import { UserLoginScheme } from "./scheme.ts";

export class UserLoginController {
  constructor(private userLoginUseCase: UserLoginUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = UserLoginScheme.validate(req.body);

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
      const { email, password } = req.body;

      const result = await this.userLoginUseCase.execute({
        email,
        password,
      });

      if (result.status === "success") {
        return res.status(201).json({
          message: "Usuario autenticado!",
          tolken: result.token,
          type: result.type,
        });
      } else {
        return res.status(500).json({
          message: "Usuario não encontrado!",
          details: result.mensagem,
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
