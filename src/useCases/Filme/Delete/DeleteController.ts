import { Request, Response } from "express";
import { DeleteFilmeUseCase } from "./Delete.ts";

export class DeleteFilmeController {
  constructor(private deleteFilmeUseCase: DeleteFilmeUseCase) {}
  async handle(req: Request, res: Response): Promise<Response> {
    try {
      await this.deleteFilmeUseCase.execute({ id: req.params.id });
      return res.status(201).send("Filme deletado com sucesso!");
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
