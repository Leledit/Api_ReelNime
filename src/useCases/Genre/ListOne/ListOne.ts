import { IGenreRepository } from "../../../repositories/IGenreRepository.js";
import { IGenerListOnelDTO } from "./ListOneDTO.js";

export class GenerListOnelUseCase {
  constructor(private genresRepository: IGenreRepository) {}
  async execute(data: IGenerListOnelDTO) {
    const searchResult = await this.genresRepository.listOne(data.id);
    if (searchResult) {
      return searchResult;
    } else {
      return undefined;
    }
  }
}
