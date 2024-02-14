import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.ts";
import { GenerSearchUseCase } from "./Search.ts";
import { GenerSearchController } from "./SearchController.ts";

const mongoGenreRepository = new MongoGenreRepository();

const generSearchUseCase = new GenerSearchUseCase(mongoGenreRepository);

const generSearchController = new GenerSearchController(generSearchUseCase);

export { generSearchUseCase, generSearchController };
