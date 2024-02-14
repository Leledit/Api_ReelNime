import { Genre } from "../../../entities/Genre.js";
import { IGenreRepository } from "../../../repositories/IGenreRepository.js";
import { GenerSearchDTO } from "./SeachDTO.js";

export class GenerSearchUseCase {
  constructor(private genresRepository: IGenreRepository) {}
  async execute(data: GenerSearchDTO) {
    const genre = new Genre(data);

    const searchResult = await this.genresRepository.query(data.name);

    if (searchResult.length !== 0) {
      return searchResult;
    } else {
      return undefined;
    }
  }
}
