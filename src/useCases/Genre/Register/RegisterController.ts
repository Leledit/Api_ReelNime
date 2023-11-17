import { Request, Response } from "express";
import { RegisterGenresUseCase } from "./Register.js";
import { registerGenreScheme } from "./scheme.js";

export class RegisterGenreController {
  constructor(private registerGenresUseCase: RegisterGenresUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { error } = registerGenreScheme.validate(request.body);

    if (error) {
      return response.status(400).send(error.message);
    }

    const { name } = request.body;

    try {
      await this.registerGenresUseCase.execute({ name });

      return response.status(201).send("Genero cadastrado com sucesso!");
    } catch (err: any) {
      return response.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
