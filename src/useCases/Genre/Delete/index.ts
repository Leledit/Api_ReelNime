import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.ts";
import { GenerDeleteUseCase } from "./Delete.ts";
import { GenerDeleteController } from "./DeleteController.ts";

const mongoGenreRepository = new MongoGenreRepository();

const generDeleteUseCase = new GenerDeleteUseCase(mongoGenreRepository);

const generDeleteController = new GenerDeleteController(generDeleteUseCase);

export { generDeleteUseCase, generDeleteController };
