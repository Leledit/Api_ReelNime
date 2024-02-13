import { StorageFirebase } from "../../../providers/IStorageFirebase.ts";
import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";
import { IAnimesDeleteDTO } from "./DeleteDTO.ts";

export class AnimeDeleteUseCase {
  constructor(private animeRepository: IAnimeRepository) {}
  async execute(data: IAnimesDeleteDTO) {
    try {
      const dataAnime = await this.animeRepository.listOne(data.id);

      if (dataAnime === null) {
        throw new Error("Anime não encontrado");
      }

      if (dataAnime.urlImg) {
        await StorageFirebase.deleteImg(dataAnime.urlImg, "animes/");
      }

      await this.animeRepository.delete(data.id);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
