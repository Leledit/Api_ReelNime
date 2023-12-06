import { MongoDashboardRepository } from "../../../repositories/implementations/MongoDashboardRepository.ts";

export class RecentlyAddedUseCase{
    constructor(private mongoDashboardRepository: MongoDashboardRepository){}
    async execute(){
        const recentylAdded = await this.mongoDashboardRepository.returnDataRecentlyAdded();
        
        return recentylAdded;
    }
}

