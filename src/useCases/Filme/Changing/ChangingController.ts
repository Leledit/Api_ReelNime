import { NextFunction, Request, Response } from "express";
import { ChangingFilmeUseCase } from "./Changing.ts";
import { changingFilmeSchema } from "./Shceme.ts";
import { getFileFromRequest } from "../../../providers/MulterImage.ts";

export class ChangingFilmeController {
  constructor(private changingFilmeUseCase: ChangingFilmeUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = changingFilmeSchema.validate(req.body);

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
      const dataImage = getFileFromRequest(req);

      if (!dataImage) {
        return res.status(400).json({
          error: "Requisição inválida",
          details: "É necessario enviar uma imagem na requsição",
        });
      }

      const { id, name, visa, duration, lauch, note, synopsis } = req.body;

      await this.changingFilmeUseCase.execute({
        id: id,
        name: name,
        duration: duration,
        lauch: lauch,
        note: note,
        synopsis: synopsis,
        visa: visa,
        dataImg: dataImage,
      });

      return res.status(200).json({
        error: "Edição realizada com sucesso",
        details: "O filme sofreu alterações nos seus dados",
      });
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
