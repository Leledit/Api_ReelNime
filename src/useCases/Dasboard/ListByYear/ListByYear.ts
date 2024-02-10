import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository";
import { IDashboardRequestDTO } from "./ListByYearDTO";

export class ListByYearDasboardUseCase {
  constructor(private mongoDashboardRepository: MongoDashboardRepository) {}

  async handle(data: IDashboardRequestDTO) {
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
