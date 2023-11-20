import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";

export class ListAllAnimesUseCase {
  constructor(private animesRepository: IAnimeRepository) {}
  async execute() {
    const dataResult = await this.animesRepository.findAll();
    if (dataResult) {
      return dataResult;
    } else {
      throw new Error("Nenhum anime foi encontrado!");
    }
  }
}
