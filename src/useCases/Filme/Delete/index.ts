import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { DeleteFilmeUseCase } from "./Delete.ts";
import { DeleteFilmeController } from "./DeleteController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const deleteFilmeUseCase = new DeleteFilmeUseCase(mongoFilmeRepository);
const deleteFilmeController = new DeleteFilmeController(deleteFilmeUseCase);

export {deleteFilmeUseCase,deleteFilmeController};