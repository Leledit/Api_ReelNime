import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.ts";
import { SearchGenresUseCase } from "./Search.ts";
import { SearchGenreController } from "./SearchController.ts";

const mongoGenreRepository = new MongoGenreRepository();

const searchGenresUseCase = new SearchGenresUseCase(mongoGenreRepository);

const searchGenreController = new SearchGenreController(searchGenresUseCase);

export { searchGenresUseCase, searchGenreController };
