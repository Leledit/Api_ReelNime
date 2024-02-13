import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { AnimeListOneUseCase } from "./ListOne.ts";
import { AnimeListOneController } from "./ListOneController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const animeListOneUseCase = new AnimeListOneUseCase(mongoAnimeRepository);
const animeListOneController = new AnimeListOneController(animeListOneUseCase);

export { animeListOneUseCase, animeListOneController };
