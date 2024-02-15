import { Anime } from "../entities/Anime.ts";
import { ListItem } from "../interfaces/listItem.ts";

export interface IAnimeRepository {
  save(anime: Anime): Promise<void>;
  listOne(id: string): Promise<Anime | null>;
  findByName(name: string): Promise<boolean>;
  findAll(): Promise<ListItem[] | null>;
  delete(id: string): Promise<void>;
  paginationList(
    initialValue: number,
    finalValue: number
  ): Promise<Anime[] | null>;
  changing(anime: Anime): Promise<void>;
  searchByGenre(genre: string): Promise<Anime[] | null>;
  findByYear(year: number): Promise<Anime[] | null>;
  changingGenre(genres: string[],idAnime:string): Promise<boolean>;
  totalRecords(): Promise<number>
}
