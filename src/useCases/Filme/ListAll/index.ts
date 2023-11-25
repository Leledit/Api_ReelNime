import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { ListAllFilmeUseCase } from "./ListAll.ts";
import { ListAllFilmeController } from "./ListAllController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const listAllFilmeUseCase = new ListAllFilmeUseCase(mongoFilmeRepository);
const listAllFilmeController = new ListAllFilmeController(listAllFilmeUseCase);

export { listAllFilmeUseCase, listAllFilmeController };
