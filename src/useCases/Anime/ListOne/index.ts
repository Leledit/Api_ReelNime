import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { ListOneAnimesUseCase } from "./ListOne.ts";
import { ListOneAnimeController } from "./ListOneController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const listOneAnimesUseCase = new ListOneAnimesUseCase(mongoAnimeRepository);
const listOneAnimesController = new ListOneAnimeController(
  listOneAnimesUseCase
);

export { listOneAnimesUseCase, listOneAnimesController };
