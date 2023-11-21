import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";
import { IAnimesRequestDTO } from "./ListOneDTO.ts";

export class PaginationAnimeUseCase {
  constructor(private animeRepository: IAnimeRepository) {}
  async execute(data: IAnimesRequestDTO) {

    try{
        let finalValue = data.page * data.limit;
        let initialValue = finalValue - data.limit;
        if (data.page === 1) {
          initialValue = 0;
          finalValue = data.limit;
        }

        const dataAnime = await this.animeRepository.paginationList(initialValue,finalValue);
        return dataAnime;
    
    }catch(err){
        throw new Error("Problemas ao buscar os dados");
    }
  }
}
