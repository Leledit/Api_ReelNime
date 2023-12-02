import { NextFunction, Request, Response } from "express";
import { RegisterGenresUseCase } from "./Register.js";
import { registerGenreScheme } from "./Scheme.js";

export class RegisterGenreController {
  constructor(private registerGenresUseCase: RegisterGenresUseCase) {}

  validateRequest = async (req: Request, res: Response,next:NextFunction) => {
    const { error } = registerGenreScheme.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: "Requisição inválida",
        details: error.message,
      });
    }

    const { name } = req.body;

    const alreadyRegistered = await this.registerGenresUseCase.validateIfTheDataIsAlreadyRegistered({name});
    
    if (alreadyRegistered) {
      return res.status(409).json({
        error: "Conflito com outro registro no sistemas",
        details:
          "Foi encontrado um genero com o mesmo nome, que foi informado na requsição",
      });
    }

    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;

      await this.registerGenresUseCase.execute({ name });

      return res.status(201).json({
        error: "Cadastro efetuado com sucesso!",
        details:
          "O genero foi incluindo na base de dados do sistema",
      });
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
