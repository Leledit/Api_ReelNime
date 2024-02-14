import { IFilmeRepository } from "../../../repositories/IFilmeRepository.ts";

export class FilmeListAllUseCase {
  constructor(private filmeRepository: IFilmeRepository) {}
  async execute() {
    const dataResult = await this.filmeRepository.findAll();
    if (dataResult) {
      return dataResult;
    } else {
      throw new Error("Nenhum filme foi encontrado!");
    }
  }
}
