import { IGenreRepository } from "../../../repositories/IGenreRepository.js";
import { IGenresRequestDTO } from "./ListOneDTO.js";

export class ListOneGenresUseCase {
  constructor(private genresRepository: IGenreRepository) {}
  async execute(data: IGenresRequestDTO) {

    const searchResult = await this.genresRepository.listOne(data.id);
    if (searchResult) {
      return searchResult;
    } else {
      return undefined;
    }
  }
}
