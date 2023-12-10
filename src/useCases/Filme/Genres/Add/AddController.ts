import { NextFunction, Request, Response } from "express";
import { AddFilmeSchema } from "./Scheme.ts";
import { AddGenresInFilmeUseCase } from "./Add.ts";

export class AddGenresInFilmeController {
  constructor(private addGenresInFilmeUseCase: AddGenresInFilmeUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = AddFilmeSchema.validate(req.query);

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

      const result = await this.addGenresInFilmeUseCase.execute({
        id: id as string,
        nameGenre: nameGenre as string,
      });

      if (result === true) {
        return res.status(200).json({
          message: "Genero adicionado com sucesso!",
          details: "Um novo genero foi adicionado a lista de generos do filme",
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
