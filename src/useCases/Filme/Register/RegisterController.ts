import { Request, Response } from "express";
import multer from "multer";
import { RegisterFilmeUseCase } from "./Register.ts";
import { registerFilmeSchema } from "./scheme.ts";

const storage = multer.memoryStorage(); // Configuração de armazenamento do Multer

const upload = multer({ storage: storage });

export class RegisterFilmeController {
  constructor(private registerFilmeUseCase: RegisterFilmeUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { error } = registerFilmeSchema.validate(request.body);

    if (error) {
      return response.status(400).send(error.message);
    }

    try {
      await new Promise<void>((resolve, reject) => {
        const { name, visa, duration, lauch, note, synopsis } = request.body;

        upload.single("file")(request, response, async (err: any) => {
          const file = request.file;
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
      return response.status(201).send("filme cadastrado com sucesso!");
    } catch (err: any) {
      return response.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
