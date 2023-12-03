import clienteDbMongo from "../../database/mongoDbConfig.ts";
import { Anime } from "../../entities/Anime.ts";
import { Filme } from "../../entities/Filme.ts";
import { IDashboardRepository } from "../IDashboardRepository.ts";

export class MongoDashboardRepository implements IDashboardRepository {
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
