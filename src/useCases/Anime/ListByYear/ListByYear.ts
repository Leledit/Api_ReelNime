import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";
import { IAnimeListByYearDTO } from "./ListByYearDTO.ts";

export class AnimeListByYearUseCase {
  constructor(private animeRepository: IAnimeRepository) {}
  async execute(data: IAnimeListByYearDTO) {
    const result = await this.animeRepository.findByYear(data.year);

    return result;
  }
}
