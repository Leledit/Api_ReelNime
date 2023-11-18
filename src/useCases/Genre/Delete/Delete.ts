import { Genre } from "../../../entities/Genre.ts";
import { IGenreRepository } from "../../../repositories/IGenreRepository.ts";
import { IGenresRequestDTO } from "../Register/RegisterDTO.ts";

export class DeleteGenresUseCase{
    constructor(private deleteRepository: IGenreRepository){}

    async execute(data: IGenresRequestDTO){
        const genre = new Genre(data,data.id);
        
        await this.deleteRepository.delete(data);
    }
}