import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { AnimeDeleteUseCase } from "./Delete.ts";
import { AnimeDeleteController } from "./DeleteController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const animeDeleteUseCase = new AnimeDeleteUseCase(mongoAnimeRepository);
const animeDeleteController = new AnimeDeleteController(animeDeleteUseCase);

export { animeDeleteUseCase, animeDeleteController };
