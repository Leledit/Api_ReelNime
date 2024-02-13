import { Anime } from "../../../entities/Anime.ts";
import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";
import { StorageFirebase } from "../../../providers/IStorageFirebase.ts";
import { IAnimeRegisterDTO } from "./RegisterDTO.ts";

export class AnimeRegisterUseCase {
  constructor(private animesRepository: IAnimeRepository) {}
  async execute(data: IAnimeRegisterDTO) {
    const dataAlreadyRegistered = await this.animesRepository.findByName(
      data.name
    );

    if (!dataAlreadyRegistered) {
      const clearImgBase64 = data.img.replace(/^data:image\/\w+;base64,/, "");
      const bufferImg = Buffer.from(clearImgBase64, "base64");

      let anime;
      if (data.img) {
        const urlImgAnime = await StorageFirebase.uploadFile(
          bufferImg,
          data.name,
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
