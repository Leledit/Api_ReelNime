import clienteDbMongo from "../../database/mongoDbConfig.ts";
import { Filme } from "../../entities/Filme.ts";
import { ListItem } from "../../interfaces/listItem.ts";
import OrganizingData from "../../utils/OrganizingData.ts";
import { IFilmeRepository } from "../IFilmeRepository.ts";

export class MongoFilmeRepository implements IFilmeRepository {
  async changingGenre(genres: string[], idFilme: string): Promise<boolean> {
    try {
      const refDb = clienteDbMongo();

      const resultRequest = await refDb.collection("filmes").updateOne(
        { id: idFilme },
        {
          $set: {
            genres: genres,
          },
        }
      );

      if (resultRequest.matchedCount === 0) {
        return false;
      } else {
        return true;
      }
    } catch (error: any) {
      throw new Error("Falha ao editar os generos de filme: " + error.message);
    }
  }

  async findByYear(year: number): Promise<Filme[] | null> {
    try {
      const refDb = clienteDbMongo();
      const resultRequest = await refDb
        .collection("filmes")
        .find({ releaseYear: year })
        .toArray();

      if (resultRequest.length !== 0) {
        let dataAnimes: Filme[] = [];
        resultRequest.map((item) => {
          dataAnimes.push(
            new Filme(
              {
                name: item.name,
                duration: item.duration,
                note: item.note,
                synopsis: item.synopsis,
                visa: item.visa,
                releaseYear: item.releaseYear,
                urlImg: item.urlImg,
              },
              item.id,
              item.genres
            )
          );
        });

        return dataAnimes;
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error("Falha ao buscar um filme: " + error.message);
    }
  }

  async searchByGenre(genre: string): Promise<Filme[] | null> {
    try {
      const refDb = clienteDbMongo();
      const resultRequest = await refDb
        .collection("filmes")
        .find({ genres: { $in: [genre] } })
        .toArray();

      if (resultRequest.length !== 0) {
        let dataAnimes: Filme[] = [];
        resultRequest.map((item) => {
          dataAnimes.push(
            new Filme(
              {
                name: item.name,
                duration: item.duration,
                note: item.note,
                synopsis: item.synopsis,
                visa: item.visa,
                releaseYear: item.releaseYear,
                urlImg: item.urlImg,
              },
              item.id,
              item.genres
            )
          );
        });

        return dataAnimes;
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error("Falha ao cadastrar um filme: " + error.message);
    }
  }

  async findByName(name: string): Promise<boolean> {
    const refDb = clienteDbMongo();
    try {
      const resultRequest = await refDb.collection("filmes").findOne({
        name: name,
      });
      if (resultRequest) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Falha ao validar a existencia de um filme");
    }
  }
  async save(filme: Filme): Promise<void> {
    const refDb = clienteDbMongo();
    try {
      await refDb.collection("filmes").insertOne(filme);
    } catch (error) {
      throw new Error("Falha ao cadastrar um novo filme");
    }
  }
  async listOne(id: string): Promise<Filme | null> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection("filmes");
      const resultRequest = await collectionAnimes.findOne({ id: id });

      if (resultRequest) {
        let id = resultRequest.id;
        return new Filme(
          {
            name: resultRequest.name,
            duration: resultRequest.duration,
            releaseYear: resultRequest.releaseYear,
            note: resultRequest.note,
            synopsis: resultRequest.synopsis,
            visa: resultRequest.visa,
            urlImg: resultRequest.urlImg,
          },
          id,
          resultRequest.genres
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("erro ao recuperar um filme: " + error);
    }
  }

  async changing(filme: Filme): Promise<void> {
    try {
      const refDb = clienteDbMongo();
      const resultRequest = await refDb.collection("filmes").updateOne(
        { id: filme.id },
        {
          $set: {
            name: filme.name,
            visa: filme.visa,
            duration: filme.duration,
            note: filme.note,
            synopsis: filme.synopsis,
            urlImg: filme.urlImg,
          },
        }
      );

      if (resultRequest.matchedCount === 0) {
        throw new Error("Id invalido");
      }
    } catch (error) {
      throw new Error("erro ao atualizar um filme: " + error);
    }
  }
  async findAll(): Promise<ListItem[] | null> {
    try {
      const refDb = clienteDbMongo();
      const resultRequest = await refDb.collection("filmes").find({}).toArray();

      if (resultRequest.length !== 0) {

        return OrganizingData.organizingItemList(resultRequest);
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Falha ao obter todos os filme: " + error);
    }
  }
  totalRecords(): Promise<number> {
    const refDb = clienteDbMongo();
    const collectionAnimes = refDb.collection("filmes");

    return collectionAnimes.countDocuments();
  }
  async paginationList(
    initialValue: number,
    finalValue: number
  ): Promise<Filme[] | null> {
    try {
      const refDb = clienteDbMongo();
      const collectionFilmes = refDb.collection("filmes");
      const resultRequest = await collectionFilmes
        .find()
        .skip(initialValue)
        .limit(initialValue - finalValue)
        .toArray();
      if (resultRequest.length !== 0) {
        let dataFilmes: Filme[] = [];
        resultRequest.map((item) => {
          dataFilmes.push(
            new Filme(
              {
                name: item.name,
                duration: item.duration,
                releaseYear: item.releaseYear,
                note: item.note,
                synopsis: item.synopsis,
                genres: item.genres,
                visa: item.visa,
                urlImg: item.urlImg,
              },
              item.id,
              item.genres
            )
          );
        });

        return dataFilmes;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("erro ao buscar Filmes(paginação): " + error);
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const refDb = clienteDbMongo();
      const collectionFilme = refDb.collection("filmes");
      const resultRequest = await collectionFilme.deleteOne({ id: id });

      if (resultRequest.deletedCount === 0) {
        throw new Error("id invalido");
      }
    } catch (error: any) {
      throw new Error("erro ao deletar um Filme, " + error.message);
    }
  }
}
