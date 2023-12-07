import { Filme } from "../../../entities/Filme.ts";
import { StorageFirebase } from "../../../providers/IStorageFirebase.ts";
import { IFilmeRepository } from "../../../repositories/IFilmeRepository.ts";
import { IFilmeRequestDTO } from "./ChangingDTO.ts";
import path from "path";

export class ChangingFilmeUseCase {
  constructor(private filmeRepository: IFilmeRepository) {}
  async execute(data: IFilmeRequestDTO) {
    try {
      const oldFilmeData = await this.filmeRepository.listOne(data.id);
      if (oldFilmeData?.urlImg && data.dataImg) {
        //apagando a imagen antiga para dar lugar a nova
        await StorageFirebase.deleteImg(oldFilmeData?.urlImg, "filmes/");
      }

      let urlImg = "";

      if (data.dataImg) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + path.extname(data.dataImg.originalname);

        const urlImgAnime = await StorageFirebase.uploadFile(
          data.dataImg.buffer,
          filename,
          "filmes/"
        );
        urlImg = urlImgAnime;
      } else {
        if (oldFilmeData?.urlImg) {
          urlImg = oldFilmeData?.urlImg;
        }
      }

      const filme = new Filme(
        {
          duration: data.duration,
          lauch: data.lauch,
          name: data.name,
          note: data.note,
          synopsis: data.synopsis,
          visa: data.visa,
          genres: data.genres,
          urlImg: urlImg,
        },
        data.id
      );

      await this.filmeRepository.changing(filme);
    } catch (err: any) {
      console.log("---");
      console.log(err);
    }
  }
}
