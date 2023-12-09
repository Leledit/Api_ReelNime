import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { LitByYearUseCase } from "./LitstByYear.ts";
import { LitByYearController } from "./LitstByYearController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const litsByYearUseCase = new LitByYearUseCase(mongoAnimeRepository);
const litsByYearController = new LitByYearController(litsByYearUseCase);

export {litsByYearUseCase, litsByYearController}