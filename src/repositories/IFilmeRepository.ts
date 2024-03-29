import { Filme } from "../entities/Filme.ts";
import { ListItem } from "../interfaces/listItem.ts";

export interface IFilmeRepository {
  findByName(name: string): Promise<boolean>;
  save(filme: Filme): Promise<void>;
  listOne(id: string): Promise<Filme | null>;
  changing(filme: Filme): Promise<void>;
  findAll(): Promise<ListItem[] | null>;
  paginationList(
    initialValue: number,
    finalValue: number
  ): Promise<Filme[] | null>;
  delete(id: string): Promise<void>;
  findByYear(year: number): Promise<Filme[] | null>;
  changingGenre(genres: string[],idFilme:string): Promise<boolean>;
  totalRecords(): Promise<number>
}
