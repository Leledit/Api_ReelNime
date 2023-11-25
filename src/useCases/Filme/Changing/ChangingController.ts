import { Request, Response } from "express";
import multer from "multer";
import { ChangingFilmeUseCase } from "./Changing.ts";
import { changingFilmeSchema } from "./shceme.ts";

const storage = multer.memoryStorage(); // Configuração de armazenamento do Multer

const upload = multer({ storage: storage });

export class ChangingFilmeController {
  constructor(private changingFilmeUseCase: ChangingFilmeUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { error } = changingFilmeSchema.validate(request.body);

    if (error) {
      return response.status(400).send(error.message);
    }

    try {
      const { id, name, visa, duration, lauch, note, synopsis } = request.body;

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

        await this.changingFilmeUseCase.execute({
          id: id,
          name: name,
          duration: duration,
          lauch: lauch,
          note: note,
          synopsis: synopsis,
          visa: visa,
          dataImg: dataImg,
        });
      });

      return response.status(201).send("Anime editado com sucesso");
    } catch (err: any) {
      return response.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
