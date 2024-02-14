import { IGenreRepository } from "../../../repositories/IGenreRepository.ts";
import { IGenerDeleteDTO } from "./DeleteDTO.ts";

export class GenerDeleteUseCase {
  constructor(private deleteRepository: IGenreRepository) {}

  async execute(data: IGenerDeleteDTO) {
    await this.deleteRepository.delete(data.id);
  }
}
