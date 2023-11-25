import { NextFunction, Request, Response } from "express";
import { ChangingAnimeUseCase } from "./Changing.ts";
import { changingAnimeSchema } from "./scheme.ts";
import multer from "multer";

const storage = multer.memoryStorage(); // Configuração de armazenamento do Multer

const upload = multer({ storage: storage });

export class ChangingAnimeController {
  constructor(private changingAnimeUseCase: ChangingAnimeUseCase) {}

  private validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = changingAnimeSchema.validate(req.body);

    if (error) {
      return res.status(400).send(error.message);
    }

    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      this.validateRequest(req, res, () => {});
      const {
        name,
        watched,
        qtdEpisodes,
        releaseYear,
        note,
        status,
        nextSeason,
        previousSeason,
        synopsis,
        genres,
        id,
      } = req.body;

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

        await this.changingAnimeUseCase.execute({
          name,
          genres,
          id,
          nextSeason,
          note,
          previousSeason,
          qtdEpisodes,
          releaseYear,
          status,
          synopsis,
          watched,
          dataImg: dataImg,
        });
      });

      return res.status(201).send("Anime editado com sucesso");
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
