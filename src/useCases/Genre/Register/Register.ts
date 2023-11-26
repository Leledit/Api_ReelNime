import { Genre } from "../../../entities/Genre.js";
import { IGenreRepository } from "../../../repositories/IGenreRepository.js";
import { IGenresRequestDTO } from "./RegisterDTO.js";
export class RegisterGenresUseCase {
  constructor(private genresRepository: IGenreRepository) {}
  async execute(data: IGenresRequestDTO) {
    const genre = new Genre(data);

    await this.genresRepository.save(genre);
  }

  async validateIfTheDataIsAlreadyRegistered(data: IGenresRequestDTO){
    const returnedGenre = await this.genresRepository.findByName(data);
    if(returnedGenre.name === ""){
      return false
    }else{
      return true;
    }
  }
}
