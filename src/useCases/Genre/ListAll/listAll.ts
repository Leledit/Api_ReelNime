import { IGenreRepository } from "../../../repositories/IGenreRepository.ts";

export class ListAllGenresUseCase {
  constructor(private genresRepository: IGenreRepository) {}
  async execute() {
    return this.genresRepository.findAll();
  }
}
