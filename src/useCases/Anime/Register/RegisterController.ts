import { NextFunction, Request, Response } from "express";
import { RegisterAnimesUseCase } from "./Register.ts";
import multer from "multer";
import { registerAnimeSchema } from "./scheme.ts";

const storage = multer.memoryStorage(); // Configuração de armazenamento do Multer

const upload = multer({ storage: storage });

export class RegisterAnimeController {
  constructor(private registerAnimesUseCase: RegisterAnimesUseCase) {}

  private validateRequest = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { error } = registerAnimeSchema.validate(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }
    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      this.validateRequest(req, res, () => {});

      await new Promise<void>((resolve, reject) => {
        const {
          name,
          qtdEpisodes,
          releaseYear,
          note,
          watched,
          nextSeason,
          previousSeason,
          synopsis,
          status,
          genres,
        } = req.body;

        //If you have it, register with it
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

          const result = await this.registerAnimesUseCase.execute({
            name,
            nextSeason,
            note,
            previousSeason,
            genres,
            qtdEpisodes,
            releaseYear,
            synopsis,
            watched,
            status,
            dataImg: dataImg,
          });

          if (!result) {
            reject(new Error("Anime ja cadastrado"));
          }

          resolve();
        });
      });
      return res.status(201).send("Anime cadastrado com sucesso!");
    } catch (err: any) {
      return res.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
