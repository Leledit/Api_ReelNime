import { MongoFilmeRepository } from "../../../repositories/implementations/MongoFilmeRepository.ts";
import { LitByYearFilmeUseCase } from "./LitByYear.ts";
import { LitByYearFilmeController } from "./LitByYearController.ts";

const mongoFilmeRepository = new MongoFilmeRepository();
const litByYearFilmeUseCase = new LitByYearFilmeUseCase(mongoFilmeRepository);
const litByYearFilmeController = new LitByYearFilmeController(
  litByYearFilmeUseCase
);

export { litByYearFilmeUseCase, litByYearFilmeController };
