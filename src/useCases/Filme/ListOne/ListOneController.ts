import { NextFunction, Request, Response } from "express";
import { listOneFilmeSchema } from "./scheme.ts";
import { ListOneFilmeUseCase } from "./ListOne.ts";

export class ListOneFilmeController {
  constructor(private listOneFilmeUseCase: ListOneFilmeUseCase) {}

  private validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = listOneFilmeSchema.validate(req.params);

    if (error) {
      return res.status(400).send(error.message);
    }

    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      this.validateRequest(req, res, () => {});

      const idFilme = req.params.id;
      const dataFilme = await this.listOneFilmeUseCase.execute({ id: idFilme });

      if (dataFilme === null) {
        throw new Error("Filme  não encontrado");
      } else {
        return res.status(201).json(dataFilme);
      }
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
