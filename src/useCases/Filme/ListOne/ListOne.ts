import { IFilmeRepository } from "../../../repositories/IFilmeRepository.ts";
import { IFilmeRequestDTO } from "./ListOneDTO.ts";

export class ListOneFilmeUseCase {
  constructor(private filmeRepository: IFilmeRepository) {}
  async execute(data: IFilmeRequestDTO) {
    const dataFilme = await this.filmeRepository.listOne(data.id);

    return dataFilme;
  }
}
