import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";
import { IAnimePaginationDTO } from "./PaginationDTO.ts";

export class AnimePaginationUseCase {
  constructor(private animeRepository: IAnimeRepository) {}
  async execute(data: IAnimePaginationDTO) {
    let finalValue = data.page * data.limit;
    let initialValue = finalValue - data.limit;
    if (data.page === 1) {
      initialValue = 0;
      finalValue = data.limit;
    }
    const dataAnime = await this.animeRepository.paginationList(
      initialValue,
      finalValue
    );
    return dataAnime;
  }

  async totalRecords() {
    return await this.animeRepository.totalRecords();
  }
}
