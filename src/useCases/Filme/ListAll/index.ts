import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { FilmeListAllUseCase } from "./ListAll.ts";
import { FilmeListAllController } from "./ListAllController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const filmeListAllUseCase = new FilmeListAllUseCase(mongoFilmeRepository);
const filmeListAllController = new FilmeListAllController(filmeListAllUseCase);

export { filmeListAllUseCase, filmeListAllController };
