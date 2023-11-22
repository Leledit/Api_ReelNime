import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { ChangingAnimeUseCase } from "./Changing.ts";
import { ChangingAnimeController } from "./ChangingController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const changingAnimesUseCase = new ChangingAnimeUseCase(mongoAnimeRepository);
const changingAnimeControler = new ChangingAnimeController(
  changingAnimesUseCase
);

export { changingAnimesUseCase, changingAnimeControler };
