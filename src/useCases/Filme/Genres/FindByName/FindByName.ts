import { MongoFilmeRepository } from "../../../../repositories/implementations/MongoFilmeRepository.ts";
import { IFilmeGenreFindByNameDTO } from "./FindByNameDTO.ts";

export class FilmeGenreFindByNameUseCase {
  constructor(private mongoFilmeRepository: MongoFilmeRepository) {}
  async execute(data: IFilmeGenreFindByNameDTO) {
    const dataAnime = await this.mongoFilmeRepository.searchByGenre(data.name);
    return dataAnime;
  }
}
