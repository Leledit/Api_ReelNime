import { MongoAnimeRepository } from "../../../../repositories/implementations/MongoAnimeRepository.ts";
import { AddGenresInAnimeUseCase } from "./Add.ts";
import { AddGenresInAnimeController } from "./AddController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const addGenresInAnimeUseCase = new AddGenresInAnimeUseCase(
  mongoAnimeRepository
);
const addGenresInAnimeController = new AddGenresInAnimeController(
  addGenresInAnimeUseCase
);

export { addGenresInAnimeUseCase, addGenresInAnimeController };
