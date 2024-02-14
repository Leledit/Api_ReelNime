import { Genre } from "../../../entities/Genre.js";
import { IGenreRepository } from "../../../repositories/IGenreRepository.js";
import { IGenerRegisterDTO } from "./RegisterDTO.js";
export class GenerRegisterUseCase {
  constructor(private genresRepository: IGenreRepository) {}
  async execute(data: IGenerRegisterDTO) {
    const genre = new Genre(data);

    await this.genresRepository.save(genre);
  }

  async validateIfTheDataIsAlreadyRegistered(data: IGenerRegisterDTO) {
    const returnedGenre = await this.genresRepository.findByName(data);
    if (returnedGenre.name === "") {
      return false;
    } else {
      return true;
    }
  }
}
