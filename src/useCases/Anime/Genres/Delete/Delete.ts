import { MongoAnimeRepository } from "../../../../repositories/implementations/MongoAnimeRepository.ts";
import { AnimeGenresDeleteDTO } from "./DeleteDTO.ts";

export class AnimeGenresDeleteUseCase {
  constructor(private mongoAnimeRepository: MongoAnimeRepository) {}

  async execute(data: AnimeGenresDeleteDTO): Promise<boolean | string> {
    try {
      //Buscando os dados do anime
      const dataAnime = await this.mongoAnimeRepository.listOne(data.id);

      if (dataAnime === null) {
        return "ID do anime invalido";
      }

      //Verificando se o genero não existe no objeto do anime
      if (!dataAnime.genres?.includes(data.nameGenre)) {
        return "O genero informado não esta vinculado a este anime!";
      }

      let genres: string[] = [...dataAnime.genres];

      genres.map((item, index) => {
        if (item === data.nameGenre) {
          genres.splice(index, 1);
        }
      });

      const resultRequest = await this.mongoAnimeRepository.changingGenre(
        genres,
        data.id
      );

      if (resultRequest) {
        return true;
      } else {
        return "Houve um problema na ação de remoção de um genero";
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
