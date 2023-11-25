import { NextFunction, Request, Response } from "express";
import multer from "multer";
import { ChangingFilmeUseCase } from "./Changing.ts";
import { changingFilmeSchema } from "./shceme.ts";

const storage = multer.memoryStorage(); // Configuração de armazenamento do Multer

const upload = multer({ storage: storage });

export class ChangingFilmeController {
  constructor(private changingFilmeUseCase: ChangingFilmeUseCase) {}

  private validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = changingFilmeSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.message);
    }

    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      this.validateRequest(req, res, () => {});
      const { id, name, visa, duration, lauch, note, synopsis } = req.body;

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

      return res.status(201).send("Anime editado com sucesso");
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
