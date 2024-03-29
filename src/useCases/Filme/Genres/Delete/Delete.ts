import { MongoFilmeRepository } from "../../../../repositories/implementations/MongoFilmeRepository.ts";
import { FilmeGenresDeleteDTO } from "./DeleteDTO.ts";

export class FilmeGenresDeleteUseCase {
  constructor(private mongoFilmeRepository: MongoFilmeRepository) {}

  async execute(data: FilmeGenresDeleteDTO): Promise<boolean | string> {
    try {
      //Buscando os dados do filme
      const dataFilme = await this.mongoFilmeRepository.listOne(data.id);

      if (dataFilme === null) {
        return "ID do filme invalido";
      }

      //Verificando se o genero não existe no objeto do filme
      if (!dataFilme.genres?.includes(data.nameGenre.trim())) {
        return "O genero informado não esta vinculado a este filme!";
      }

      let genres: string[] = [...dataFilme.genres];

      genres.map((item, index) => {
        if (item === data.nameGenre.trim()) {
          genres.splice(index, 1);
        }
      });

      const resultRequest = await this.mongoFilmeRepository.changingGenre(
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
