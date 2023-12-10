import { MongoFilmeRepository } from "../../../../repositories/implementations/MongoFilmeRepository.ts";
import { AddFilmeDTOExecute } from "./AddDTO.ts";

export class AddGenresInFilmeUseCase {
  constructor(private mongoFilmeRepository: MongoFilmeRepository) {}

  async execute(data: AddFilmeDTOExecute): Promise<boolean | string> {
    try {
      //Buscando os dados do filme
      const dataFilme = await this.mongoFilmeRepository.listOne(data.id);

      if (dataFilme === null) {
        return "ID do filme invalido";
      }

      //Verificando se esse genero ja esta cadastrado
      if (dataFilme.genres?.includes(data.nameGenre)) {
        return "Genero ja incluindo nesse filme";
      }

      if (dataFilme.genres) {
        const dataGenres: string[] = [...dataFilme.genres, data.nameGenre];

        const resultRequest = await this.mongoFilmeRepository.changingGenre(
          dataGenres,
          data.id
        );

        if (resultRequest) {
          return true;
        } else {
          return "Houve um problema na ação de adição um genero";
        }
      } else {
        return "Problemas ao recuperar os generos ja cadastrados";
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
