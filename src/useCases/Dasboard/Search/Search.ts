import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository";
import { IDashboardSearchDTO } from "./SearchDTO";

export class DashboardSearchUseCase {
  constructor(private mongoDashboardRepository: MongoDashboardRepository) {}
  async handle(data: IDashboardSearchDTO) {
    const result = await this.mongoDashboardRepository.returnSearch(
      data.search,
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
