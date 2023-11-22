import { Request, Response } from "express";
import { ChangingAnimeUseCase } from "./Changing.ts";
import { changingAnimeSchema } from "./scheme.ts";
import multer from "multer";

const storage = multer.memoryStorage(); // Configuração de armazenamento do Multer

const upload = multer({ storage: storage });

export class ChangingAnimeController {
  constructor(private changingAnimeUseCase: ChangingAnimeUseCase) {}
  async handle(request: Request, response: Response): Promise<Response> {
    const { error } = changingAnimeSchema.validate(request.body);

    if (error) {
      return response.status(400).send(error.message);
    }

    try {
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
        img,
      } = request.body;

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
      })

      return response.status(201).send("Anime editado com sucesso");
    } catch (err: any) {
      return response.status(400).json("Erro na solicitação: " + err.message);
    }
  }
}
