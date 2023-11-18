import { Request, Response } from "express";
import { DeleteGenresUseCase } from "./Delete.ts";

export class DeleteGenreController {
  constructor(private DeleteGenresUseCase: DeleteGenresUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    try {
        await this.DeleteGenresUseCase.execute({name:'',id:request.params.id});
        return response.status(201).send("Genero deletado com sucesso!");
    } catch (err: any) {
      return response.status(400).json("Erro na solicitação: " + err.message);
    }

   
  }
}
