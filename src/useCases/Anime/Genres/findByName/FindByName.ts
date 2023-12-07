import { MongoAnimeRepository } from "../../../../repositories/implementations/MongoAnimeRepository.ts";
import { IFindByNameDTO } from "./FindByNameDTO.ts";

export class FilmeFindByNameGenreUseCase {
    constructor(private mongoAnimeRepository: MongoAnimeRepository) {}
    async execute(data: IFindByNameDTO) {
      const dataAnime = await this.mongoAnimeRepository.searchByGenre(data.name);
      return dataAnime;
    }
  }
  