import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { IAnimesRequestDTO } from "./GenresDTO.ts";

export class GenresUseCase {
  constructor(private mongoAnimeRepository: MongoAnimeRepository) {}
  async execute(data: IAnimesRequestDTO) {
    const dataAnime = await this.mongoAnimeRepository.searchByGenre(data.name);
    return dataAnime;
  }
}
