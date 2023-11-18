import { Genre } from "../../../entities/Genre.js";
import { IGenreRepository } from "../../../repositories/IGenreRepository.js";
import { IGenresRequestDTO } from "../Register/RegisterDTO.js";

export class ListOneGenresUseCase{
    constructor(private genresRepository:IGenreRepository){}
    async execute(data:IGenresRequestDTO){
        const genre = new Genre(data);

        const searchResult = await this.genresRepository.findByName(genre);
        if(searchResult.name !== ''){
            return searchResult;
        }else{
            throw new Error("Genero não encontrado");
        }
    }
}