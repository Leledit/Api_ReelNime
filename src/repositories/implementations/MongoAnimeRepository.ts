import clienteDbMongo from "../../database/mongoDbConfig.ts";
import { Anime } from "../../entities/Anime.ts";
import { IAnimeRepository } from "../IAnimeRepository.ts";

export class MongoAnimeRepository implements IAnimeRepository {
  async save(anime: Anime): Promise<void> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection("animes");
      await collectionAnimes.insertOne(anime);
    } catch (error: any) {
      throw new Error("Falha ao cadastrar um anime: " + error.message);
    }
  }

  async changingGenre(genres: string[], idAnime: string): Promise<boolean> {
    try {
      const refDb = clienteDbMongo();

      const resultRequest = await refDb.collection("animes").updateOne(
        { id: idAnime },
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
      throw new Error("Falha ao editar os generos de anime: " + error.message);
    }
  }

  async findByYear(year: number): Promise<Anime[] | null> {
    try {
      const refDb = clienteDbMongo();
      const resultRequest = await refDb
        .collection("animes")
        .find({ releaseYear: year })
        .toArray();

      if (resultRequest.length !== 0) {
        let dataAnimes: Anime[] = [];
        resultRequest.map((item) => {
          dataAnimes.push(
            new Anime(
              {
                name: item.name,
                nextSeason: item.nextSeason,
                previousSeason: item.previousSeason,
                note: item.note,
                qtdEpisodes: item.qtdEpisodes,
                releaseYear: item.releaseYear,
                status: item.status,
                synopsis: item.synopsis,
                watched: item.watched,
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
      throw new Error("Falha ao buscar um anime: " + error.message);
    }
  }

  async searchByGenre(genre: string): Promise<Anime[] | null> {
    try {
      const refDb = clienteDbMongo();
      const resultRequest = await refDb
        .collection("animes")
        .find({ genres: { $in: [genre] } })
        .toArray();

      if (resultRequest.length !== 0) {
        let dataAnimes: Anime[] = [];
        resultRequest.map((item) => {
          dataAnimes.push(
            new Anime(
              {
                name: item.name,
                nextSeason: item.nextSeason,
                previousSeason: item.previousSeason,
                note: item.note,
                qtdEpisodes: item.qtdEpisodes,
                releaseYear: item.releaseYear,
                status: item.status,
                synopsis: item.synopsis,
                watched: item.watched,
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
      throw new Error("Falha ao buscar um anime: " + error.message);
    }
  }

  async changing(anime: Anime): Promise<void> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection("animes");
      const resultRequest = await collectionAnimes.updateOne(
        { id: anime.id },
        {
          $set: {
            qtdEpisodes: anime.qtdEpisodes,
            releaseYear: anime.releaseYear,
            name: anime.name,
            synopsis: anime.synopsis,
            nextSeason: anime.nextSeason,
            previousSeason: anime.previousSeason,
            watched: anime.watched,
            note: anime.note,
            status: anime.status,
            genres: anime.genres,
            urlImg: anime.urlImg,
          },
        }
      );

      if (resultRequest.matchedCount === 0) {
        throw new Error("Id invalido");
      }
    } catch (error) {
      throw new Error("erro ao atualizar um anime: " + error);
    }
  }

  async findByName(name: string): Promise<boolean> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnime = refDb.collection("animes");
      const resultRequest = await collectionAnime.findOne({
        name: name,
      });

      if (resultRequest) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      throw new Error(
        "Falha ao validar a existencia de um genero: " + error.message
      );
    }
  }

  async listOne(id: string): Promise<Anime | null> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection("animes");
      const resultRequest = await collectionAnimes.findOne({ id: id });

      if (resultRequest) {
        return new Anime(
          {
            name: resultRequest.name,
            nextSeason: resultRequest.nextSeason,
            note: resultRequest.note,
            previousSeason: resultRequest.previousSeason,
            qtdEpisodes: resultRequest.qtdEpisodes,
            releaseYear: resultRequest.releaseYear,
            status: resultRequest.status,
            synopsis: resultRequest.synopsis,
            watched: resultRequest.watched,
            updateDate: resultRequest.updateDate,
            urlImg: resultRequest.urlImg,
          },
          resultRequest.id,
          resultRequest.genres
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("erro ao recuperar um anime: " + error);
    }
  }
  async findAll(): Promise<Anime[] | null> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection("animes");
      const resultRequest = await collectionAnimes.find({}).toArray();

      if (resultRequest.length !== 0) {
        let dataAnimes: Anime[] = [];
        resultRequest.map((item) => {
          dataAnimes.push(
            new Anime(
              {
                name: item.name,
                nextSeason: item.nextSeason,
                previousSeason: item.previousSeason,
                note: item.note,
                qtdEpisodes: item.qtdEpisodes,
                releaseYear: item.releaseYear,
                status: item.status,
                synopsis: item.synopsis,
                watched: item.watched,
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
    } catch (error) {
      throw new Error("Falha ao obter todos os animes: " + error);
    }
  }
  async delete(id: string): Promise<void> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection("animes");
      const resultRequest = await collectionAnimes.deleteOne({ id: id });

      if (resultRequest.deletedCount === 0) {
        throw new Error("id invalido");
      }
    } catch (error: any) {
      throw new Error("erro ao deletar um anime, " + error.message);
    }
  }
  async paginationList(
    initialValue: number,
    finalValue: number
  ): Promise<Anime[] | null> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection("animes");
      const resultRequest = await collectionAnimes
        .find()
        .skip(initialValue)
        .limit(finalValue)
        .toArray();

      if (resultRequest.length !== 0) {
        let dataAnimes: Anime[] = [];
        resultRequest.map((item) => {
          dataAnimes.push(
            new Anime(
              {
                name: item.name,
                nextSeason: item.nextSeason,
                previousSeason: item.previousSeason,
                note: item.note,
                qtdEpisodes: item.qtdEpisodes,
                releaseYear: item.releaseYear,
                status: item.status,
                synopsis: item.synopsis,
                watched: item.watched,
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
    } catch (error) {
      throw new Error("erro ao buscar animes(paginação): " + error);
    }
  }
}
