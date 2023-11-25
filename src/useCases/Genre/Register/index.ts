import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.ts";
import { RegisterGenresUseCase } from "./Register.ts";
import { RegisterGenreController } from "./RegisterController.ts";

const mongoGenreRepository = new MongoGenreRepository();

const registerGenresUseCase = new RegisterGenresUseCase(mongoGenreRepository);

const registerGenreController = new RegisterGenreController(
  registerGenresUseCase
);

export { registerGenresUseCase, registerGenreController };
