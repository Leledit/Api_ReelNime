import { Request, Response } from "express";
import { RegisterGenresUseCase } from "./Register.ts";

export class RegisterGenreController {
  constructor(private registerGenresUseCase: RegisterGenresUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    try {
      await this.registerGenresUseCase.execute(name);

      return response.status(201).send("Genero cadastrado com sucesso!");
    } catch (err) {
      return response
        .status(400)
        .json("Um erro desconhecido aconteceu: " + err);
    }
  }
}
