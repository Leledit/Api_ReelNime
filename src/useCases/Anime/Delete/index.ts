import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { DeleteAnimeUseCase } from "./Delete.ts";
import { DeleteAnimeController } from "./DeleteController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const deleteAnimeUseCase = new DeleteAnimeUseCase(mongoAnimeRepository);
const deleteAnimeController = new DeleteAnimeController(deleteAnimeUseCase);

export { deleteAnimeUseCase, deleteAnimeController };
