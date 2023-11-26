import { NextFunction, Request, Response } from "express";
import { RegisterGenresUseCase } from "./Register.js";
import { registerGenreScheme } from "./scheme.js";

export class RegisterGenreController {
  constructor(private registerGenresUseCase: RegisterGenresUseCase) {}

  validateRequest = async (req: Request, res: Response,next:NextFunction) => {
    const { error } = registerGenreScheme.validate(req.body);

    if (error) {
      return res.status(400).send(error.message);
    }

    const { name } = req.body;

    const alreadyRegistered = await this.registerGenresUseCase.validateIfTheDataIsAlreadyRegistered({name});
    
    if (alreadyRegistered) {
      return res.status(401).send("Gênero já cadastrado.");
    }

    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const { name } = req.body;

      await this.registerGenresUseCase.execute({ name });

      return res.status(201).send("Genero cadastrado com sucesso!");
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
