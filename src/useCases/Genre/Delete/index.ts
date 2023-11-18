import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.ts";
import { DeleteGenresUseCase } from "./Delete.ts";
import { DeleteGenreController } from "./DeleteController.ts";

const mongoGenreRepository = new MongoGenreRepository();

const deleteGenresUseCase = new DeleteGenresUseCase(mongoGenreRepository);

const deleteGenreController = new DeleteGenreController(deleteGenresUseCase);

export {deleteGenresUseCase,deleteGenreController}