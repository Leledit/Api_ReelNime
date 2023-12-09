import clienteDbMongo from "../../database/mongoDbConfig.ts";
import { Anime } from "../../entities/Anime.ts";
import { Filme } from "../../entities/Filme.ts";
import { IDashboardRepository } from "../IDashboardRepository.ts";

export class MongoDashboardRepository implements IDashboardRepository {
  async returnDataPopular(): Promise<object> {
    try {
      const refDb = clienteDbMongo();

      const collectionAnimes = refDb.collection("animes");
      const resultAnimes = await collectionAnimes
        .find()
        .sort({ note: -1 })
        .limit(10)
        .toArray();

      const collectionFilmes = refDb.collection("filmes");
      const resultFilmes = await collectionFilmes
        .find()
        .sort({ note: -1 })
        .limit(10)
        .toArray();

      const result = [...resultAnimes, ...resultFilmes];

      result.sort((a, b) => b.note - a.note);

      const popular = result.slice(0, 10);

      return popular;
    } catch (error) {
      throw new Error("Falha ao obter os dados dos animes: " + error);
    }
  }

  async returnDataRecentlyAdded(): Promise<object> {
    try {
      const refDb = clienteDbMongo();

      const collectionAnimes = refDb.collection("animes");
      const resultAnimes = await collectionAnimes
        .aggregate([{ $sort: { data: -1 } }])
        .toArray();

      const collectionFilmes = refDb.collection("filmes");
      const resultFilmes = await collectionFilmes
        .aggregate([{ $sort: { data: -1 } }])
        .toArray();

      const result = [...resultAnimes, ...resultFilmes];

      result.sort((a, b) => b.updateDate - a.updateDate);

      const recentylAdded = result.slice(0, 10);

      return recentylAdded;
    } catch (error) {
      throw new Error("Falha ao obter os dados dos animes: " + error);
    }
  }

  async returnDataRecentlyAddedAnimes(limit: number): Promise<Anime[] | null> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection("animes");
      const resultRequest = await collectionAnimes
        .find({})
        .sort({ updateDate: -1 })
        .limit(limit)
        .toArray();

      if (resultRequest.length !== 0) {
        let dataAnimes: Anime[] = [];
        resultRequest.map((item) => {
          let id = item.id;
          dataAnimes.push(
            new Anime(
              {
                name: item.name,
                genres: item.genres,
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
              id
            )
          );
        });

        return dataAnimes;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Falha ao obter os dados dos animes: " + error);
    }
  }

  async returnDataRecentlyAddedFilmes(limit: number): Promise<Filme[] | null> {
    try {
      const refDb = clienteDbMongo();
      const collectionFilmes = refDb.collection("filmes");
      const resultRequest = await collectionFilmes
        .find({})
        .sort({ updateDate: -1 })
        .limit(limit)
        .toArray();

      if (resultRequest.length !== 0) {
        let dataFilmes: Filme[] = [];
        resultRequest.map((item) => {
          let id = item.id;
          dataFilmes.push(
            new Filme(
              {
                name: item.name,
                duration: item.duration,
                lauch: item.lauch,
                note: item.note,
                synopsis: item.synopsis,
                visa: item.visa,
                genres: item.genres,
                urlImg: item.urlImg,
              },
              id
            )
          );
        });

        return dataFilmes;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Falha ao obter os dados dos filmes: " + error);
    }
  }
}