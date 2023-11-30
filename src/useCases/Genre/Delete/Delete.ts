import { IGenreRepository } from "../../../repositories/IGenreRepository.ts";
import { IGenresRequestDTO } from "./DeleteDTO.ts";

export class DeleteGenresUseCase {
  constructor(private deleteRepository: IGenreRepository) {}

  async execute(data: IGenresRequestDTO) {
    await this.deleteRepository.delete(data.id);
  }
}
