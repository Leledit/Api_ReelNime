import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { FilmeListOneUseCase } from "./ListOne.ts";
import { FilmeListOneController } from "./ListOneController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const filmeListOneUseCase = new FilmeListOneUseCase(mongoFilmeRepository);
const filmeListOneController = new FilmeListOneController(filmeListOneUseCase);

export { filmeListOneUseCase, filmeListOneController };
