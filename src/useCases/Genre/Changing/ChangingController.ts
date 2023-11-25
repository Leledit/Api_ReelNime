import { NextFunction, Request, Response } from "express";
import { ChangingGenresUseCase } from "./Changing.ts";
import { changingGenreScheme } from "./scheme.ts";

export class ChangingGenerController {
  constructor(private changingGenresUseCase: ChangingGenresUseCase) {}

  private validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = changingGenreScheme.validate(req.body);

    if (error) {
      return res.status(400).send(error.message);
    }

    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      this.validateRequest(req, res, () => {});
      const id = req.params.id;
      const { name } = req.body;

      await this.changingGenresUseCase.execute({ name: name, id: id });
      return res.status(201).send("Genero editado com sucesso!");
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
