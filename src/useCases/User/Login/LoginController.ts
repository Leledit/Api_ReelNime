import { NextFunction, Request, Response } from "express";
import { LoginUserUseCase } from "./Login.ts";
import { loginUserSchema } from "./Scheme.ts";

export class LoginUserController {
  constructor(private loginUserUseCase: LoginUserUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = loginUserSchema.validate(req.body);

    console.log("---");
    console.log(req.body);

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

      const result = await this.loginUserUseCase.execute({
        email,
        password,
      });

      if (result === true) {
        return res.status(201).json({
          message: "Usuario autenticado!",
          details: "o usuario esta autenticado e pode proceguir na aplicação",
        });
      } else {
        return res.status(500).json({
          message: "Problemas ao realizar o login",
          details: result,
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
