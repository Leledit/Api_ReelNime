import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.ts";
import { ChangingGenresUseCase } from "./Changing.ts";
import { ChangingGenerController } from "./ChangingController.ts";

const mongoGenreRepository = new MongoGenreRepository();

const changingGenresUseCase = new ChangingGenresUseCase(mongoGenreRepository);

const changingGenerController = new ChangingGenerController(
  changingGenresUseCase
);

export { changingGenresUseCase, changingGenerController };