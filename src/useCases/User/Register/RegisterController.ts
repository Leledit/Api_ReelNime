import { NextFunction, Request, Response } from "express";
import { RegisterUserUseCase } from "./Register.ts";
import { registerUserSchema } from "./Scheme.ts";

export class RegisterUserController {
  constructor(private registerUserUsecase: RegisterUserUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerUserSchema.validate(req.body);

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

      const {email,name,password} = req.body;

      const result = await this.registerUserUsecase.execute({email,name,password});

      if(result.status === "success"){
        return res.status(201).json({
          message: "Cadastro efetuado com sucesso!",
          tolken: result.token,
        });
      }else{
        return res.status(500).json({
          message: "Problemas ao realizar o cadastro",
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
