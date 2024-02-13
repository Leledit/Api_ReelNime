import { MongoAnimeRepository } from "../../../../repositories/implementations/MongoAnimeRepository.ts";
import { AnimeGenresAddUseCase } from "./Add.ts";
import { AnimeGenresAddController } from "./AddController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const animeGenresAddUseCase = new AnimeGenresAddUseCase(mongoAnimeRepository);
const animeGenresAddController = new AnimeGenresAddController(
  animeGenresAddUseCase
);

export { animeGenresAddUseCase, animeGenresAddController };
