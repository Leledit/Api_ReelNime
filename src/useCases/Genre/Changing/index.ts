import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.ts";
import { GenerChangingUseCase } from "./Changing.ts";
import { GenerChangingController } from "./ChangingController.ts";

const mongoGenreRepository = new MongoGenreRepository();

const generChangingUseCase = new GenerChangingUseCase(mongoGenreRepository);

const generChangingController = new GenerChangingController(
  generChangingUseCase
);

export { generChangingUseCase, generChangingController };
