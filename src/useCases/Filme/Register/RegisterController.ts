import { NextFunction, Request, Response } from "express";
import { RegisterFilmeUseCase } from "./Register.ts";
import { registerFilmeSchema } from "./Scheme.ts";
import { getFileFromRequest } from "../../../providers/MulterImage.ts";

export class RegisterFilmeController {
  constructor(private registerFilmeUseCase: RegisterFilmeUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = registerFilmeSchema.validate(req.body);

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

      const { name, visa, duration, lauch, note, synopsis } = req.body;

      const resultRequest = await this.registerFilmeUseCase.execute({
        name,
        visa,
        duration,
        lauch,
        note,
        synopsis,
        dataImg: dataImage,
      });

      if (!resultRequest) {
        return res.status(409).json({
          error: "Conflito com outro registro no sistemas",
          details:
            "Foi encontrado um genero com o mesmo nome, que foi informado na requsição",
        });
      } else {
        return res.status(201).json({
          error: "Cadastro efetuado com sucesso!",
          details: "O filme foi incluindo na base de dados do sistema",
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
