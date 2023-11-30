import { IGenreRepository } from "../../../repositories/IGenreRepository.js";

export class ListAllGenresUseCase {
  constructor(private genresRepository: IGenreRepository) {}
  async execute() {
    return this.genresRepository.findAll();
  }
}
