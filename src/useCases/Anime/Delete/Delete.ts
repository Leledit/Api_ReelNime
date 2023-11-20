import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";
import { IAnimesRequestDTO } from "./ListOneDTO.ts";

export class DeleteAnimeUseCase {
  constructor(private animeRepository: IAnimeRepository) {}
  async execute(data: IAnimesRequestDTO) {
    await this.animeRepository.delete(data.id);
  }
}
