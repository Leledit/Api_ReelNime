import { MongoAnimeRepository } from "../../../../repositories/implementations/MongoAnimeRepository.ts";
import { AnimeGenreFindByNameDTO } from "./FindByNameDTO.ts";

export class AnimeGenreFindByNameUseCase {
  constructor(private mongoAnimeRepository: MongoAnimeRepository) {}
  async execute(data: AnimeGenreFindByNameDTO) {
    const dataAnime = await this.mongoAnimeRepository.searchByGenre(data.name);
    return dataAnime;
  }
}
