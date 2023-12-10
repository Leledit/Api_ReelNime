import { NextFunction, Request, Response } from "express";
import { AddAnimeSchema } from "./Scheme.ts";
import { AddGenresInAnimeUseCase } from "./Add.ts";

export class AddGenresInAnimeController {
  constructor(private addGenresInAnimeUseCase: AddGenresInAnimeUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = AddAnimeSchema.validate(req.query);

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
      const { id, nameGenre } = req.query;

      const result = await this.addGenresInAnimeUseCase.execute({
        id: id as string,
        nameGenre: nameGenre as string,
      });

      if (result === true) {
        return res.status(200).json({
          message: "Genero adicionado com sucesso!",
          details: "Um novo genero foi adicionado a lista de generos do anime",
        });
      } else {
        return res.status(500).json({
          error: "Recurso não encontrado",
          details: result,
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
