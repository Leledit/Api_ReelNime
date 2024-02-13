import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { AnimeChangingUseCase } from "./Changing.ts";
import { AnimeChangingController } from "./ChangingController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const animeChangingUseCase = new AnimeChangingUseCase(mongoAnimeRepository);
const animeChangingControler = new AnimeChangingController(
  animeChangingUseCase
);

export { animeChangingUseCase, animeChangingControler };
