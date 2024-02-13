import { NextFunction, Request, Response } from "express";
import { AnimeGenresDeleteUseCase } from "./Delete.ts";
import { AnimeGenresDeleteSchema } from "./scheme.ts";

export class AnimeGenresDeleteController {
  constructor(private animeGenresDeleteUseCase: AnimeGenresDeleteUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = AnimeGenresDeleteSchema.validate(req.query);

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

      const result = await this.animeGenresDeleteUseCase.execute({
        id: id as string,
        nameGenre: nameGenre as string,
      });

      if (result === true) {
        return res.status(200).json({
          message: "Genero excluido com sucesso!",
          details: "O Genero foi excluido da lista de generos do anime",
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
