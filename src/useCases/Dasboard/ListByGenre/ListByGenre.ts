import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository";
import { IDashboardListByGenreDTO } from "./ListByGenreDTO";

export class DashboardListByGenreUseCase {
  constructor(private mongoDashboardRepository: MongoDashboardRepository) {}

  async handle(data: IDashboardListByGenreDTO) {
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
