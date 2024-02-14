import { IFilmeRepository } from "../../../repositories/IFilmeRepository.js";
import { FilmeLitByYearDTO } from "./ListByYearDTO.js";

export class FilmeLitByYearUseCase {
  constructor(private filmeRepository: IFilmeRepository) {}
  async execute(data: FilmeLitByYearDTO) {
    const result = await this.filmeRepository.findByYear(data.year);

    return result;
  }
}
