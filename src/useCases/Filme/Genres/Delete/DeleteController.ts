import { NextFunction, Request, Response } from "express";
import { FilmeGenresDeleteUseCase } from "./Delete.ts";
import { FilmeGenresDeleteScheme } from "./scheme.ts";

export class FilmeGenresDeleteController {
  constructor(private filmeGenresDeleteUseCase: FilmeGenresDeleteUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = FilmeGenresDeleteScheme.validate(req.query);

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

      const result = await this.filmeGenresDeleteUseCase.execute({
        id: id as string,
        nameGenre: nameGenre as string,
      });

      if (result === true) {
        return res.status(200).json({
          message: "Genero excluido com sucesso!",
          details: "O Genero foi excluido da lista de generos do filme",
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
