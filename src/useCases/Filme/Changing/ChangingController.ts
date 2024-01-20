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
  
      const { name, visa, duration, lauch, note, synopsis, genres, releaseYear, img } = req.body;

      const params = req.params;

      await this.changingFilmeUseCase.execute({
        id: params.id, 
        name: name,
        duration: duration,
        releaseYear: parseInt(releaseYear),
        lauch: lauch,
        note: note,
        synopsis: synopsis,
        visa: visa,
        genres: genres,
        img: img,
      });

      return res.status(200).json({
        message: "Edição realizada com sucesso",
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
