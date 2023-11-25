import { StorageFirebase } from "../../../providers/IStorageFirebase.ts";
import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";
import { IAnimesRequestDTO } from "./DeleteDTO.ts";

export class DeleteAnimeUseCase {
  constructor(private animeRepository: IAnimeRepository) {}
  async execute(data: IAnimesRequestDTO) {
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
