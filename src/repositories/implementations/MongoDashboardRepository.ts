import clienteDbMongo from "../../database/mongoDbConfig.ts";
import { Anime } from "../../entities/Anime.ts";
import { Filme } from "../../entities/Filme.ts";
import { IDashboardRepository } from "../IDashboardRepository.ts";

export class MongoDashboardRepository implements IDashboardRepository {
  async listByGenre(
    genre: string,
    limit: number,
    page: number
  ): Promise<object> {
    const refDb = clienteDbMongo();

    const resultRequestAnime = await refDb
      .collection("animes")
      .find({
        genres: { $in: [genre] },
      })
      .toArray();

    const resultRequestFilmes = await refDb
      .collection("filmes")
      .find({
        genres: { $in: [genre] },
      })
      .toArray();

    let allData = [...resultRequestAnime, ...resultRequestFilmes];
    const totalRecords = resultRequestAnime.length + resultRequestFilmes.length;
    const paginationData = allData.slice((page - 1) * limit, page * limit);
    return { total: totalRecords, itens: paginationData };
  }

  async searchByGenre(
    genre: string[],
    typeItem: string,
    id: string
  ): Promise<object> {
    try {
      const refDb = clienteDbMongo();
      let recommendations: any = [];

      if (genre.length === 0) {
        return recommendations;
      }

      for (const item of genre) {
        //Caso ja tenha a quantidade necessaria, pare o processo de busca
        if (recommendations.length >= 4) {
          break;
        }

        const resultRequest = await refDb
          .collection(typeItem)
          .find({
            genres: { $in: [item] },
            id: { $ne: id },
          })
          .toArray();

        if (resultRequest.length < 4) {
          recommendations = [...recommendations, ...resultRequest];
        } else {
          if (recommendations.length === 0) {
            recommendations = resultRequest;
            break;
          } else {
            recommendations = [...recommendations, ...resultRequest];
            break;
          }
        }
      }

      if (recommendations.length > 4) {
        return recommendations.slice(0, 4);
      } else {
        return recommendations;
      }
    } catch (error) {
      throw new Error("erro ao recuperar um anime: " + error);
    }
  }

  async returnItem(id: string): Promise<object> {
    try {
      const refDb = clienteDbMongo();
      const requestAnime = await refDb.collection("animes").findOne({ id: id });
      const requestFilmes = await refDb
        .collection("filmes")
        .findOne({ id: id });

      if (requestAnime) {
        return {
          dataItem: requestAnime,
          type: "animes",
        };
      } else {
        return {
          dataItem: requestFilmes,
          type: "filmes",
        };
      }
    } catch (error) {
      throw new Error("erro ao buscar o item: " + error);
    }
  }

  async returnSearch(
    search: string,
    limit: number,
    page: number
  ): Promise<{ total: number; itens: any[] }> {
    const refDb = clienteDbMongo();
    const resulAnimes = await refDb
      .collection("animes")
      .find({ name: { $regex: search, $options: "i" } })
      .toArray();

    const resulFilmes = await refDb
      .collection("filmes")
      .find({ name: { $regex: search, $options: "i" } })
      .toArray();

    let allData = [...resulAnimes, ...resulFilmes];
    const totalRecords = resulAnimes.length + resulFilmes.length;
    const paginationData = allData.slice((page - 1) * limit, page * limit);
    return { total: totalRecords, itens: paginationData };
  }

  async returnDataListingByYear(
    limit: number,
    page: number,
    year: number
  ): Promise<{ total: number; itens: any }> {
    try {
      const refDb = clienteDbMongo();
      const resulAnimes = await refDb
        .collection("animes")
        .find({ releaseYear: year })
        .toArray();

      const resultFilmes = await refDb
        .collection("filmes")
        .find({ releaseYear: year })
        .toArray();

      let allData = [...resulAnimes, ...resultFilmes];
      const totalRecords = resulAnimes.length + resultFilmes.length;
      const paginationData = allData.slice((page - 1) * limit, page * limit);

      return { total: totalRecords, itens: paginationData };
    } catch (error: any) {
      throw new Error("Falha ao buscar um anime: " + error.message);
    }
  }

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

      const recentylAdded = result.slice(0, 24);

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
                note: item.note,
                releaseYear: item.releaseYear,
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
