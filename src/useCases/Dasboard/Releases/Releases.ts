import { IDashboardRepository } from "../../../repositories/IDashboardRepository.js";

export class DashboardReleasesUseCase {
  constructor(private dashboardRepository: IDashboardRepository) {}
  async execute() {
    const dataAnime =
      await this.dashboardRepository.returnDataRecentlyAddedAnimes(10);

    if (dataAnime === null) {
      throw new Error("Problemas ao buscar os animes");
    }

    const dataFilmes =
      await this.dashboardRepository.returnDataRecentlyAddedFilmes(10);

    if (dataFilmes === null) {
      throw new Error("Problemas ao buscar os filmes");
    }

    const releases = {
      dataAnime: dataAnime,
      dataFilmes: dataFilmes,
    };

    return releases;
  }
}
