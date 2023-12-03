import { Anime } from "../entities/Anime";
import { Filme } from "../entities/Filme";

export interface IDashboardRepository {
    returnDataRecentlyAddedAnimes(limit:number):Promise<Anime[]|null>,
    returnDataRecentlyAddedFilmes(limit:number):Promise<Filme[]|null>,
    retunrDataRecentlyAdded():Promise<object>
}