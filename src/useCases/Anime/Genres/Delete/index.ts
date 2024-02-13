import { MongoAnimeRepository } from "../../../../repositories/implementations/MongoAnimeRepository.ts";
import { AnimeGenresDeleteUseCase } from "./Delete.ts";
import { AnimeGenresDeleteController } from "./DeleteController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const animeGenresDeleteUseCase = new AnimeGenresDeleteUseCase(
  mongoAnimeRepository
);
const animeGenresDeleteController = new AnimeGenresDeleteController(
  animeGenresDeleteUseCase
);

export { animeGenresDeleteUseCase, animeGenresDeleteController };
