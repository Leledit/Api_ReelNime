import { Anime } from "../../../entities/Anime.ts";
import { StorageFirebase } from "../../../providers/IStorageFirebase.ts";
import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";
import { IAnimesRequestDTO } from "./ChangingDTO.ts";
import path from "path";

export class ChangingAnimeUseCase {
  constructor(private animesRepository: IAnimeRepository) {}
  async execute(data: IAnimesRequestDTO) {
    
    try {
      const oldAnimeData = await this.animesRepository.listOne(data.id);
      if (oldAnimeData?.urlImg && data.dataImg) {
        //apagando a imagen antiga para dar lugar a nova
        await StorageFirebase.deleteImg(oldAnimeData?.urlImg, "animes/");
      }

      let urlImg = "";

      if (data.dataImg) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + path.extname(data.dataImg.originalname);

        const urlImgAnime = await StorageFirebase.uploadFile(
          data.dataImg.buffer,
          filename,
          "animes/"
        );
        urlImg = urlImgAnime;
      } else {
        if (oldAnimeData?.urlImg) {
          urlImg = oldAnimeData?.urlImg;
        }
      }

      const anime = new Anime(
        {
          name: data.name,
          nextSeason: data.nextSeason,
          note: data.note,
          previousSeason: data.previousSeason,
          qtdEpisodes: data.qtdEpisodes,
          releaseYear: data.releaseYear,
          status: data.status,
          synopsis: data.synopsis,
          watched: data.watched,
          urlImg: urlImg,
        },
        data.id
      );

      await this.animesRepository.changing(anime);
    } catch (err: any) {}
  }
}
