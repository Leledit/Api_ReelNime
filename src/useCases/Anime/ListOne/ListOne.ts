import { IAnimeRepository } from "../../../repositories/IAnimeRepository.ts";
import { IAnimesRequestDTO } from "./ListOneDTO.ts";


export class ListOneAnimesUseCase{
    constructor(private animesRepository: IAnimeRepository){}

    async execute(data:IAnimesRequestDTO){
        
        const dataAnime = await this.animesRepository.listOne(data.id);

        return dataAnime;
    }
}