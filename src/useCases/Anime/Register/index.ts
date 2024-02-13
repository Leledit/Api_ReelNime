import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { AnimeRegisterUseCase } from "./Register.ts";
import { AnimeRegisterController } from "./RegisterController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const animeRegisterUseCase = new AnimeRegisterUseCase(mongoAnimeRepository);
const animeRegisterController = new AnimeRegisterController(
  animeRegisterUseCase
);

export { animeRegisterUseCase, animeRegisterController };
