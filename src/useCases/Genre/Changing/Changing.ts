import { Genre } from "../../../entities/Genre.ts";
import { IGenreRepository } from "../../../repositories/IGenreRepository.ts";
import { IGenresRequestDTO } from "../Register/RegisterDTO.ts";

export class ChangingGenresUseCase {
  constructor(private gereRepository: IGenreRepository) {}
  async execute(data: IGenresRequestDTO) {
    const genre = new Genre({ name: data.name }, data.id);

    await this.gereRepository.changing(genre);
  }
}
