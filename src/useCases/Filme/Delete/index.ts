import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { FilmeDeleteUseCase } from "./Delete.ts";
import { FilmeDeleteController } from "./DeleteController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const filmeChangingUseCase = new FilmeDeleteUseCase(mongoFilmeRepository);
const filmeDeleteController = new FilmeDeleteController(filmeChangingUseCase);

export { filmeChangingUseCase, filmeDeleteController };
