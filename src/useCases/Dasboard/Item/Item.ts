import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository";
import { IDashboardRequestDTO } from "./ItemDTO";

export class ItemDasboardUseCase {
  constructor(private mongoDashboardRepository: MongoDashboardRepository) {}

  async handle(data: IDashboardRequestDTO) {
    const resultItem: any = await this.mongoDashboardRepository.returnItem(
      data.id
    );

    const recommendations:any = await this.mongoDashboardRepository.searchByGenre(
      resultItem.dataItem.genres,
      resultItem.type,
      resultItem.dataItem.id
    );  
    
    return {
      item:resultItem.dataItem,
      recommendations: recommendations,
    }
  }
}
