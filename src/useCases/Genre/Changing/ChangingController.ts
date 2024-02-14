import { NextFunction, Request, Response } from "express";
import { GenerChangingUseCase } from "./Changing.ts";
import { GenerChangingScheme } from "./scheme.ts";

export class GenerChangingController {
  constructor(private generChangingUseCase: GenerChangingUseCase) {}

  private validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = GenerChangingScheme.validate(req.body);

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
      this.validateRequest(req, res, () => {});
      const id = req.params.id;
      const { name } = req.body;

      await this.generChangingUseCase.execute({ name: name, id: id });
      return res.status(200).json({
        error: "Edição realizada com sucesso",
        details: "O genero sofreu alterações nos seus dados",
      });
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
