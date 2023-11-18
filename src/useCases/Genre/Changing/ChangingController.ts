import { Request, Response } from "express";
import { ChangingGenresUseCase } from "./Changing.ts";
import { changingGenreScheme } from "./scheme.ts";

export class ChangingGenerController {
  constructor(private changingGenresUseCase: ChangingGenresUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { error } = changingGenreScheme.validate(request.body);

    if (error) {
      return response.status(400).send(error.message);
    }

    const id = request.params.id;
    const { name } = request.body;

    try {
        await this.changingGenresUseCase.execute({name:name,id:id});
        return response.status(201).send("Genero editado com sucesso!");
    } catch (err: any) {
      return response.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
