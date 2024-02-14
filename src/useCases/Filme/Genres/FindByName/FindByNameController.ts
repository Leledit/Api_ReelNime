import { NextFunction, Request, Response } from "express";
import { FilmeGenreFindByNameUseCase } from "./FindByName.ts";
import { FilmeGenreFindByNameScheme } from "./scheme.ts";

export class FilmeGenreFindByNameController {
  constructor(
    private filmeGenreFindByNameUseCase: FilmeGenreFindByNameUseCase
  ) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = FilmeGenreFindByNameScheme.validate(req.query);

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
      const nameGenre = req.query.name as string;

      const dataQuery = await this.filmeGenreFindByNameUseCase.execute({
        name: nameGenre,
      });

      if (dataQuery) {
        return res.status(200).json(dataQuery);
      } else {
        return res.status(404).json({
          error: "Nenhum registro foi encontrado",
          details: "Nenhum filme foi encontrado, com o genero informado",
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
