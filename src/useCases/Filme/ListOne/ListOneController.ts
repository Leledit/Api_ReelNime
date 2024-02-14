import { NextFunction, Request, Response } from "express";
import { FilmeListOneScheme } from "./scheme.ts";
import { FilmeListOneUseCase } from "./ListOne.ts";

export class FilmeListOneController {
  constructor(private filmeListOneUseCase: FilmeListOneUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = FilmeListOneScheme.validate(req.params);

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
      const idFilme = req.params.id;
      const dataFilme = await this.filmeListOneUseCase.execute({ id: idFilme });

      if (dataFilme === null) {
        return res.status(404).json({
          error: "Nenhum registro foi encontrado",
          details: "Nunhum filme foi encontrado no nosso sistema",
        });
      } else {
        return res.status(200).json(dataFilme);
      }
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
