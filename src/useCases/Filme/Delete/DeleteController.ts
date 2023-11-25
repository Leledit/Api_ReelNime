import { Request, Response } from "express";
import { DeleteFilmeUseCase } from "./Delete.ts";

export class DeleteFilmeController {
  constructor(private deleteFilmeUseCase: DeleteFilmeUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      await this.deleteFilmeUseCase.execute({ id: request.params.id });
      return response.status(201).send("Filme deletado com sucesso!");
    } catch (err: any) {
      return response.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
