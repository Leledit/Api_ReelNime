import { Genre } from "../../../entities/Genre.ts";
import { IGenreRepository } from "../../../repositories/IGenreRepository.ts";
import { IGenerChangingDTO } from "./ChangingDTO.ts";

export class GenerChangingUseCase {
  constructor(private gereRepository: IGenreRepository) {}
  async execute(data: IGenerChangingDTO) {
    const genre = new Genre({ name: data.name }, data.id);

    await this.gereRepository.changing(genre);
  }
}
