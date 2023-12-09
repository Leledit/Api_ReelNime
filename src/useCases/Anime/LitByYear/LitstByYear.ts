import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";
import { ILitByYearDTO } from "./LitstByYearDTO.ts";

export class LitByYearAnimeUseCase {
  constructor(private animeRepository: IAnimeRepository) {}
  async execute(data: ILitByYearDTO) {
    const result = await this.animeRepository.findByYear(data.year);

    return result;
  }
}
