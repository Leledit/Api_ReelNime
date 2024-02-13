import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { AnimeListAllUseCase } from "./ListAll.ts";
import { AnimeListAllController } from "./ListAllController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const animeListAllUseCase = new AnimeListAllUseCase(mongoAnimeRepository);
const animeListAllController = new AnimeListAllController(animeListAllUseCase);

export { animeListAllUseCase, animeListAllController };
