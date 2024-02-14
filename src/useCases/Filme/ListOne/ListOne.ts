import { IFilmeRepository } from "../../../repositories/IFilmeRepository.ts";
import { IFilmeListOneDTO } from "./ListOneDTO.ts";

export class FilmeListOneUseCase {
  constructor(private filmeRepository: IFilmeRepository) {}
  async execute(data: IFilmeListOneDTO) {
    const dataFilme = await this.filmeRepository.listOne(data.id);

    return dataFilme;
  }
}
