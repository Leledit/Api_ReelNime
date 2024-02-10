import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository";
import { IDashboardRequestDTO } from "./SearchDTO";

export class SearchDashboardUseCase {
  constructor(private mongoDashboardRepository: MongoDashboardRepository) {}
  async handle(data:IDashboardRequestDTO){
    const result = await this.mongoDashboardRepository.returnSearch(data.search,data.limit,data.page);
    if (result.total !== 0) {
      return result;
    } else {
      return undefined;
    }
  }
}
