import { Anime } from "../../../entities/Anime.ts";
import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";
import { StorageFirebase } from "../../../utils/storage/StorageFirebase.ts";
import { IAnimesRequestDTO } from "./RegisterDTO.ts";
import path from "path";

export class RegisterAnimesUseCase {
  constructor(private animesRepository: IAnimeRepository) {}
  async execute(data: IAnimesRequestDTO) {
    const dataAlreadyRegistered = await this.animesRepository.findByName(
      data.name
    );

    if (!dataAlreadyRegistered) {
      let anime;
      if (data.dataImg) {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
        const filename = uniqueSuffix + path.extname(data.dataImg.originalname);

        const urlImgAnime = await StorageFirebase.uploadFile(
          data.dataImg.buffer,
          filename,
          "animes/"
        );

        anime = new Anime({
          name: data.name,
          nextSeason: data.nextSeason,
          note: data.note,
          previousSeason: data.previousSeason,
          qtdEpisodes: data.qtdEpisodes,
          releaseYear: data.releaseYear,
          status: data.status,
          synopsis: data.synopsis,
          watched: data.watched,
          genres: data.genres,
          urlImg: urlImgAnime,
        });
      } else {
        anime = new Anime({
          name: data.name,
          nextSeason: data.nextSeason,
          note: data.note,
          previousSeason: data.previousSeason,
          qtdEpisodes: data.qtdEpisodes,
          releaseYear: data.releaseYear,
          status: data.status,
          synopsis: data.synopsis,
          genres: data.genres,
          watched: data.watched,
        });
      }
      await this.animesRepository.save(anime);
      return true;
    } else {
      return false;
    }
  }
}
