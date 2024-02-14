import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { FilmeRegisterUseCase } from "./Register.ts";
import { FilmeRegisterController } from "./RegisterController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const filmeRegisterUseCase = new FilmeRegisterUseCase(mongoFilmeRepository);
const filmeRegisterController = new FilmeRegisterController(
  filmeRegisterUseCase
);

export { filmeRegisterUseCase, filmeRegisterController };
