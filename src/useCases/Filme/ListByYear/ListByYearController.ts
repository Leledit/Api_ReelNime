import { NextFunction, Request, Response } from "express";
import { LitByYearFilmeUseCase } from "./ListByYear.js";
import { LitByYearAnimeScheme } from "../../Anime/LitsByYear/Scheme.js";

export class LitByYearFilmeController {
  constructor(private litByYearUseCase: LitByYearFilmeUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = LitByYearAnimeScheme.validate(req.query);

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
      const { year } = req.query;

      const dataAnimes = await this.litByYearUseCase.execute({
        year: parseInt(year as string),
      });

      if (dataAnimes === null) {
        return res.status(404).json({
          error: "Nenhum registro foi encontrado",
          details: "Nenhum anime foi encontrado no nosso sistema",
        });
      } else {
        return res.status(200).json(dataAnimes);
      }
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
