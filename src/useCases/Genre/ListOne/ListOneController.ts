import { NextFunction, Request, Response } from "express";
import { GenerListOnelUseCase } from "./ListOne.js";
import { GenerListOnelScheme } from "./scheme.js";

export class GenerListOnelController {
  constructor(private generListOnelUseCase: GenerListOnelUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = GenerListOnelScheme.validate(req.params);

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
      const idGenre = req.params.id as string;

      const dataGenre = await this.generListOnelUseCase.execute({
        id: idGenre,
      });

      if (dataGenre) {
        return res.status(200).json(dataGenre);
      } else {
        return res.status(400).json({
          error: "Requisição inválida",
          details:
            "Deve ser informado o id de um genero, cadastrado no sistema",
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
