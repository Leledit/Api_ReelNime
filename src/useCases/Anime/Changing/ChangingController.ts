import { NextFunction, Request, Response } from "express";
import { AnimeChangingUseCase } from "./Changing.ts";
import { AnimeChangingScheme } from "./scheme.ts";

export class AnimeChangingController {
  constructor(private animeChangingUseCase: AnimeChangingUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = AnimeChangingScheme.validate(req.body);

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
      const {
        name,
        watched,
        qtdEpisodes,
        releaseYear,
        note,
        status,
        nextSeason,
        previousSeason,
        synopsis,
        img,
      } = req.body;

      const { id } = req.params;

      await this.animeChangingUseCase.execute({
        name,
        id,
        nextSeason,
        note: parseInt(note),
        previousSeason,
        qtdEpisodes: parseInt(qtdEpisodes),
        releaseYear: parseInt(releaseYear),
        status,
        synopsis,
        watched,
        img: img,
      });

      return res.status(200).json({
        message: "Edição realizada com sucesso",
        details: "O anime sofreu alterações nos seus dados",
      });
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
