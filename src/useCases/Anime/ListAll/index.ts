import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { ListAllAnimesUseCase } from "./ListAll.ts";
import { ListAllAnimeController } from "./ListAllController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const listAllAnimesUseCase = new ListAllAnimesUseCase(mongoAnimeRepository);
const listAllAnimesController = new ListAllAnimeController(
  listAllAnimesUseCase
);

export { listAllAnimesUseCase, listAllAnimesController };
