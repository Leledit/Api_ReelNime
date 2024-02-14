import { IGenreRepository } from "../../../repositories/IGenreRepository.js";

export class GenerListAllUseCase {
  constructor(private genresRepository: IGenreRepository) {}
  async execute() {
    return this.genresRepository.findAll();
  }
}
