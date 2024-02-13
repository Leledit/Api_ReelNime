import { MongoFilmeRepository } from "../../../../repositories/implementations/MongoFilmeRepository.ts";
import { FilmeGenresAddDTO } from "./AddDTO.ts";

export class FilmeGenresAddUseCase {
  constructor(private mongoFilmeRepository: MongoFilmeRepository) {}

  async execute(data: FilmeGenresAddDTO): Promise<boolean | string> {
    try {
      //Buscando os dados do filme
      const dataFilme = await this.mongoFilmeRepository.listOne(data.id);

      if (dataFilme === null) {
        return "ID do filme invalido";
      }

      //Verificando se esse genero ja esta cadastrado
      if (dataFilme.genres?.includes(data.nameGenre.trim())) {
        return "Genero ja incluindo nesse filme";
      }

      if (dataFilme.genres) {
        const dataGenres: string[] = [
          ...dataFilme.genres,
          data.nameGenre.trim(),
        ];

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
