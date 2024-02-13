import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";
import { IAnimeListOneDTO } from "./ListOneDTO.ts";

export class AnimeListOneUseCase {
  constructor(private animesRepository: IAnimeRepository) {}

  async execute(data: IAnimeListOneDTO) {
    const dataAnime = await this.animesRepository.listOne(data.id);

    return dataAnime;
  }
}
