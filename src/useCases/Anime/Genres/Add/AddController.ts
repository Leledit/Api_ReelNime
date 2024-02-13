import { NextFunction, Request, Response } from "express";
import { AnimeGenresAddScheme } from "./scheme.ts";
import { AnimeGenresAddUseCase } from "./Add.ts";

export class AnimeGenresAddController {
  constructor(private animeGenresAddUseCase: AnimeGenresAddUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = AnimeGenresAddScheme.validate(req.body);

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
      const { id, nameGenre } = req.body;

      const result = await this.animeGenresAddUseCase.execute({
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
