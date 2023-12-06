import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.ts";

export class PopularUseCase {
  constructor(private mongoDashboardRepository: MongoDashboardRepository) {}
  async execute() {
    const dataPopular = await this.mongoDashboardRepository.returnDataPopular();
   
    return dataPopular;
  }
}
