import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository";
import { IDasboardListByYearDTO } from "./ListByYearDTO";

export class DasboardListByYearUseCase {
  constructor(private mongoDashboardRepository: MongoDashboardRepository) {}

  async handle(data: IDasboardListByYearDTO) {
    const result = await this.mongoDashboardRepository.returnDataListingByYear(
      data.limit,
      data.page,
      data.year
    );

    if (result.total !== 0) {
      return result;
    } else {
      return undefined;
    }
  }
}
