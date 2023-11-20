import { Request, Response } from "express";
import { RegisterAnimesUseCase } from "./Register.ts";
import multer from "multer";
import { registerAnimeSchema } from "./scheme.ts";
import { IAnimesRequestDTO } from "./RegisterDTO.ts";

const storage = multer.memoryStorage(); // Configuração de armazenamento do Multer

const upload = multer({ storage: storage });

export class RegisterAnimeController {
  constructor(private registerAnimesUseCase: RegisterAnimesUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { error } = registerAnimeSchema.validate(request.body);

    if (error) {
      return response.status(400).send(error.message);
    }

    try {
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
      } = request.body;

      //If you have it, register with it
      upload.single("file")(request, response, (err: any) => {
        const file = request.file;

        if (file) {
          const dataANime: IAnimesRequestDTO = {
            name,
            nextSeason,
            note,
            genres,
            previousSeason,
            qtdEpisodes,
            releaseYear,
            synopsis,
            watched,
            status,
            dataImg: {
              buffer: file?.buffer,
              fieldname: file.fieldname,
              mimetype: file.mimetype,
              originalname: file.originalname,
              size: file.size,
            },
          };

          this.registerAnimesUseCase.execute(dataANime);
        } else {
          const dataANime: IAnimesRequestDTO = {
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
          };

          this.registerAnimesUseCase.execute(dataANime);
        }
      });
    } catch (err: any) {
      return response.status(400).json("Erro na solicitação: " + err.message);
    }

    return response.status(201).send("Anime cadastrado com sucesso!");
  }
}
