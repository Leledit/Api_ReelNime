import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { LitByYearFilmeUseCase } from "./ListByYear.ts";
import { LitByYearFilmeController } from "./ListByYearController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const litByYearFilmeUseCase = new LitByYearFilmeUseCase(mongoFilmeRepository);
const litByYearFilmeController = new LitByYearFilmeController(
  litByYearFilmeUseCase
);

export { litByYearFilmeUseCase, litByYearFilmeController };
