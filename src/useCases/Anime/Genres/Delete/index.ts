import { MongoAnimeRepository } from "../../../../repositories/implementations/MongoAnimeRepository.ts";
import { DeleteGenresInAnimeUseCase } from "./Delete.ts";
import { DeleteGenresInAnimeController } from "./DeleteController.ts";


const mongoAnimeRepository = new MongoAnimeRepository();
const deleteGenresInAnimeUseCase = new DeleteGenresInAnimeUseCase(
  mongoAnimeRepository
);
const deleteGenresInAnimeController = new DeleteGenresInAnimeController(
  deleteGenresInAnimeUseCase
);

export { deleteGenresInAnimeUseCase, deleteGenresInAnimeController };
