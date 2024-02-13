import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository";
import { IDashboardItemDTO } from "./ItemDTO";

export class DasboardItemUseCase {
  constructor(private mongoDashboardRepository: MongoDashboardRepository) {}

  async handle(data: IDashboardItemDTO) {
    const resultItem: any = await this.mongoDashboardRepository.returnItem(
      data.id
    );

    const recommendations: any =
      await this.mongoDashboardRepository.searchByGenre(
        resultItem.dataItem.genres,
        resultItem.type,
        resultItem.dataItem.id
      );

    return {
      item: resultItem.dataItem,
      recommendations: recommendations,
    };
  }
}
