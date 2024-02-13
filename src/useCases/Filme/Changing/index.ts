import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { FilmeChangingUseCase } from "./Changing.ts";
import { FilmeChangingController } from "./ChangingController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const filmeChangingUseCase = new FilmeChangingUseCase(mongoFilmeRepository);
const filmeChangingController = new FilmeChangingController(
  filmeChangingUseCase
);

export { filmeChangingUseCase, filmeChangingController };
