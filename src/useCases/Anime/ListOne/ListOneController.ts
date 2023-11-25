import { NextFunction, Request, Response } from "express";
import { ListOneAnimesUseCase } from "./ListOne.ts";
import { listOneAnimeSchema } from "./scheme.ts";

export class ListOneAnimeController {
  constructor(private listOneAnimesUseCase: ListOneAnimesUseCase) {}

  private validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = listOneAnimeSchema.validate(req.params);

    if (error) {
      return res.status(400).send(error.message);
    }

    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      this.validateRequest(req, res, () => {});
      const idAnime = req.params.id;
      const dataAnime = await this.listOneAnimesUseCase.execute({
        id: idAnime,
      });

      if (dataAnime === null) {
        throw new Error("Anime não encontrado");
      } else {
        return res.status(201).json(dataAnime);
      }
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
