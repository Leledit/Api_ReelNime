import { NextFunction, Request, Response } from "express";
import { AnimeListOneUseCase } from "./ListOne.ts";
import { AnimeListOneScheme } from "./scheme.ts";

export class AnimeListOneController {
  constructor(private animeListOneUseCase: AnimeListOneUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = AnimeListOneScheme.validate(req.params);

    if (error) {
      return res.status(400).json({
        error: "Requisição inválida",
        details: error.message,
      });
    }

    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const idAnime = req.params.id;
      const dataAnime = await this.animeListOneUseCase.execute({
        id: idAnime,
      });

      if (dataAnime === null) {
        return res.status(404).json({
          error: "Nenhum registro foi encontrado",
          details: "Nunhum anime foi encontrado no nosso sistema",
        });
      } else {
        return res.status(200).json(dataAnime);
      }
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
