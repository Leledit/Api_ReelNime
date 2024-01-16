import { Genre } from "../../../entities/Genre.js";
import { IGenreRepository } from "../../../repositories/IGenreRepository.js";
import { IGenresRequestDTO } from "../Register/RegisterDTO.js";

export class SearchGenresUseCase {
  constructor(private genresRepository: IGenreRepository) {}
  async execute(data: IGenresRequestDTO) {
    const genre = new Genre(data);

    const searchResult = await this.genresRepository.query(data.name);
    
    if (searchResult.length !== 0) {
      return searchResult;
    } else {
      return undefined;
    }
  }
}
