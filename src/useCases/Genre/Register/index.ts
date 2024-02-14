import { MongoGenreRepository } from "../../../repositories/implementations/MongoGenreRepository.ts";
import { GenerRegisterUseCase } from "./Register.ts";
import { GenerRegisterController } from "./RegisterController.ts";

const mongoGenreRepository = new MongoGenreRepository();

const generRegisterUseCase = new GenerRegisterUseCase(mongoGenreRepository);

const generRegisterController = new GenerRegisterController(
  generRegisterUseCase
);

export { generRegisterUseCase, generRegisterController };
