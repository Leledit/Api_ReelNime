import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository";
import { IDashboardRequestDTO } from "./ListByGenreDTO";

export class ListByGenreDasboardUseCase {
  constructor(private mongoDashboardRepository: MongoDashboardRepository) {}

  async handle(data: IDashboardRequestDTO) {
    const result: any = await this.mongoDashboardRepository.listByGenre(
      data.genre,
      data.limit,
      data.page
    );

    if (result.total !== 0) {
      return result;
    } else {
      return undefined;
    }
  }
}
