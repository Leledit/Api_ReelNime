import { IFilmeRepository } from "../../../repositories/IFilmeRepository.ts";
import { IFilmesRequestDTO } from "./PaginationDTO.ts";

 export class PaginationFilmeUseCase {
    constructor(private filmeRepository: IFilmeRepository){}
    async execute(data:IFilmesRequestDTO){
        try{
            let finalValue = data.page * data.limit;
            let initialValue = finalValue - data.limit;
            if (data.page === 1) {
              initialValue = 0;
              finalValue = data.limit;
            }

            const dataFilme = await this.filmeRepository.paginationList(initialValue,finalValue);
            
            return dataFilme;
        
        }catch(err){
            throw new Error("Problemas ao buscar os dados");
        }
    }
}