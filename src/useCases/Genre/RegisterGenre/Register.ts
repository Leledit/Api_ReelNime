import { Genre } from "../../../entities/Genre.ts";
import { IGenreRepository } from "../../../repositories/IGenreRepository.ts";
import { IGenresRequestDTO } from "./RegisterDTO.ts";
export class RegisterGenresUseCase {
  constructor(private genresRepository: IGenreRepository) {}
  async execute(data: IGenresRequestDTO) {
    const genre = new Genre(data);
    
    const returnedGenre = await this.genresRepository.findByName(genre);

    if(returnedGenre.name === ''){
       await this.genresRepository.save(genre);
    }else{

      throw new Error("Genero ja cadastrado");
    }
  }
}
