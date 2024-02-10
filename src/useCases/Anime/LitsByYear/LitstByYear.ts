import { IAnimeRepository } from "../../../repositories/IAnimeRepository.js";
import { ILitByYearDTO } from "./LitstByYearDTO.js";

export class LitByYearAnimeUseCase {
  constructor(private animeRepository: IAnimeRepository) {}
  async execute(data: ILitByYearDTO) {
    const result = await this.animeRepository.findByYear(data.year);

    return result;
  }
}
