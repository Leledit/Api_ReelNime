import { Anime } from "../entities/Anime.ts";
import { Filme } from "../entities/Filme.ts";

export interface IDashboardRepository {
    returnDataRecentlyAddedAnimes(limit:number):Promise<Anime[]|null>,
    returnDataRecentlyAddedFilmes(limit:number):Promise<Filme[]|null>,
    returnDataRecentlyAdded():Promise<object>
    returnDataPopular():Promise<object>
}