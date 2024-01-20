import { NextFunction, Request, Response } from "express";
import { RegisterFilmeUseCase } from "./Register.ts";
import { registerFilmeSchema } from "./Scheme.ts";

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

      const { name, visa, duration,  note, synopsis, releaseYear,img } =
        req.body;

      const resultRequest = await this.registerFilmeUseCase.execute({
        name,
        visa: Boolean(visa),
        releaseYear: parseInt(releaseYear),
        duration,
        note: parseInt(note),
        synopsis,
        img:img,
      });

      if (!resultRequest) {
        return res.status(409).json({
          error: "Conflito com outro registro no sistemas",
          details:
            "Foi encontrado um filme com o mesmo nome, que foi informado na requsição",
        });
      } else {
        return res.status(201).json({
          message: "Cadastro efetuado com sucesso!",
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
