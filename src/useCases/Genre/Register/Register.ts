import { Genre } from "../../../entities/Genre.js";
import { IGenreRepository } from "../../../repositories/IGenreRepository.js";
import { IGenresRequestDTO } from "./RegisterDTO.js";
export class RegisterGenresUseCase {
  constructor(private genresRepository: IGenreRepository) {}
  async execute(data: IGenresRequestDTO) {
    const genre = new Genre(data);

    const returnedGenre = await this.genresRepository.findByName(genre);

    if (returnedGenre.name === "") {
      await this.genresRepository.save(genre);
    } else {
      throw new Error("Genero ja cadastrado");
    }
  }
}
