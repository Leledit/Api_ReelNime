import { NextFunction, Request, Response } from "express";
import { RegisterAnimesUseCase } from "./Register.ts";
import { registerAnimeSchema } from "./scheme.ts";
import { getFileFromRequest } from "../../../providers/MulterImage.ts";

export class RegisterAnimeController {
  constructor(private registerAnimesUseCase: RegisterAnimesUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerAnimeSchema.validate(req.body);

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
      const dataImage = getFileFromRequest(req);

      if (!dataImage) {
        return res.status(400).json({
          error: "Requisição inválida",
          details: "É necessario enviar uma imagem na requsição",
        });
      }

      const {
        name,
        qtdEpisodes,
        releaseYear,
        note,
        watched,
        nextSeason,
        previousSeason,
        synopsis,
        status,
      } = req.body;

      const result = await this.registerAnimesUseCase.execute({
        name,
        nextSeason,
        note: parseInt(note),
        previousSeason,
        qtdEpisodes: parseInt(qtdEpisodes),
        releaseYear: parseInt(releaseYear),
        synopsis,
        watched: Boolean(watched),
        status,
        dataImg: dataImage,
      });

      if (!result) {
        return res.status(409).json({
          error: "Conflito com outro registro no sistemas",
          details:
            "Foi encontrado um anime com o mesmo nome, que foi informado na requsição",
        });
      } else {
        return res.status(201).json({
          message: "Cadastro efetuado com sucesso!",
          details: "O anime foi incluindo na base de dados do sistema",
        });
      }
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
