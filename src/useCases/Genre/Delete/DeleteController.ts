import { Request, Response } from "express";
import { DeleteGenresUseCase } from "./Delete.ts";

export class DeleteGenreController {
  constructor(private DeleteGenresUseCase: DeleteGenresUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      await this.DeleteGenresUseCase.execute({
        name: "",
        id: req.params.id,
      });
      return res.status(201).send("Genero deletado com sucesso!");
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
