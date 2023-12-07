import { NextFunction, Request, Response } from "express";
import { FilmeFindByNameGenreUseCase } from "./FindByName.ts";
import { findByNameGenreFilmeSchema } from "./Scheme.ts";

export class FilmeFindByNameGenreController {
    constructor(private filmeFindByNameGenreUseCase: FilmeFindByNameGenreUseCase) {}
  
    validateRequest = (req: Request, res: Response, next: NextFunction) => {
      const { error } = findByNameGenreFilmeSchema.validate(req.query);
  
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
  
        const dataQuery = await this.filmeFindByNameGenreUseCase.execute({ name: nameGenre });
  
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
  