import { MongoAnimeRepository } from "../../../../repositories/implementations/MongoAnimeRepository.ts";
import { IAnimeGenresAddDTO } from "./AddDTO.ts";

export class AnimeGenresAddUseCase {
  constructor(private mongoAnimeRepository: MongoAnimeRepository) {}

  async execute(data: IAnimeGenresAddDTO): Promise<boolean | string> {
    try {
      //Buscando os dados do anime
      const dataAnime = await this.mongoAnimeRepository.listOne(data.id);

      if (dataAnime === null) {
        return "ID do anime invalido";
      }

      //Verificando se esse genero ja esta cadastrado
      if (dataAnime.genres?.includes(data.nameGenre.trim())) {
        return "Genero ja incluindo nesse anime";
      }

      if (dataAnime.genres) {
        const dataGenres: string[] = [
          ...dataAnime.genres,
          data.nameGenre.trim(),
        ];

        const resultRequest = await this.mongoAnimeRepository.changingGenre(
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
