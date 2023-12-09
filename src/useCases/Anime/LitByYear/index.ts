import { MongoAnimeRepository } from "../../../repositories/implementations/MongoAnimeRepository.ts";
import { LitByYearAnimeUseCase } from "./LitstByYear.ts";
import { LitByYearAnimeController } from "./LitstByYearController.ts";

const mongoAnimeRepository = new MongoAnimeRepository();
const litsByYearAnimeUseCase = new LitByYearAnimeUseCase(mongoAnimeRepository);
const litByYearAnimeController = new LitByYearAnimeController(litsByYearAnimeUseCase);

export {litsByYearAnimeUseCase, litByYearAnimeController}