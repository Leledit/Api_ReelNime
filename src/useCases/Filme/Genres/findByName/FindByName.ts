import { MongoFilmeRepository } from "../../../../repositories/implementations/MongoFilmeRepository.ts";
import { IFindByNameDTO } from "./FindByNameDTO.ts";

export class FilmeFindByNameGenreUseCase {
    constructor(private mongoFilmeRepository: MongoFilmeRepository) {}
    async execute(data: IFindByNameDTO) {
      const dataAnime = await this.mongoFilmeRepository.searchByGenre(data.name);
      return dataAnime;
    }
  }
  