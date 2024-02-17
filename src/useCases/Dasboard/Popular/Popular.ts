import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.ts";
import { IDasboardPopularDTO } from "./PopularDTO.ts";

export class DasboardPopularUseCase {
  constructor(private mongoDashboardRepository: MongoDashboardRepository) {}
  async execute(data:IDasboardPopularDTO) {
    const dataPopular = await this.mongoDashboardRepository.returnDataPopular(data.limit);

    return dataPopular;
  }
}
