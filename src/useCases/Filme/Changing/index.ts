import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { ChangingFilmeUseCase } from "./Changing.ts";
import { ChangingFilmeController } from "./ChangingController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const changingFilmeUseCase = new ChangingFilmeUseCase(mongoFilmeRepository);
const changingFilmeController = new ChangingFilmeController(
  changingFilmeUseCase
);

export { changingFilmeUseCase, changingFilmeController };
