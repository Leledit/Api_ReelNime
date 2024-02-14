import { IFilmeRepository } from "../../../repositories/IFilmeRepository.ts";
import { IFilmePaginationDTO } from "./PaginationDTO.ts";

export class FilmePaginationUseCase {
  constructor(private filmeRepository: IFilmeRepository) {}
  async execute(data: IFilmePaginationDTO) {
    let finalValue = data.page * data.limit;
    let initialValue = finalValue - data.limit;
    if (data.page === 1) {
      initialValue = 0;
      finalValue = data.limit;
    }

    const dataFilme = await this.filmeRepository.paginationList(
      initialValue,
      finalValue
    );

    return dataFilme;
  }

  async totalRecords() {
    return await this.filmeRepository.totalRecords();
  }
}
