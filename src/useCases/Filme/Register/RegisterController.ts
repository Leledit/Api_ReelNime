import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { RegisterFilmeUseCase } from "./Register.ts";
import { registerFilmeSchema } from "./scheme.ts";

const storage = multer.memoryStorage(); // Configuração de armazenamento do Multer

const upload = multer({ storage: storage });

export class RegisterFilmeController {
  constructor(private registerFilmeUseCase: RegisterFilmeUseCase) {}

  private validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = registerFilmeSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.message);
    }

    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      this.validateRequest(req, res, () => {});

      await new Promise<void>((resolve, reject) => {
        const { name, visa, duration, lauch, note, synopsis } = req.body;

        upload.single("file")(req, res, async (err: any) => {
          const file = req.file;
          let dataImg;
          if (file) {
            dataImg = {
              buffer: file?.buffer,
              fieldname: file.fieldname,
              mimetype: file.mimetype,
              originalname: file.originalname,
              size: file.size,
            };
          }
          const resultRequest = await this.registerFilmeUseCase.execute({
            name,
            visa,
            duration,
            lauch,
            note,
            synopsis,
            dataImg: dataImg,
          });
          if (!resultRequest) {
            reject(new Error("Filme ja cadastrado"));
          }

          resolve();
        });
      });
      return res.status(201).send("filme cadastrado com sucesso!");
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
