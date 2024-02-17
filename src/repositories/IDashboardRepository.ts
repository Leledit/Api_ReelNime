import { ListItem } from "../interfaces/listItem.ts";

export interface IDashboardRepository {
  returnDataRecentlyAddedAnimes(limit: number): Promise<ListItem[] | null>;
  returnDataRecentlyAddedFilmes(limit: number): Promise<ListItem[] | null>;
  returnDataRecentlyAdded(): Promise<object>;
  returnDataPopular(limit:number): Promise<object>;
  returnDataListingByYear(
    limit: number,
    page: number,
    year: number
  ): Promise<{ total: number; itens: any[] }>;
  returnSearch(
    search: string,
    limit: number,
    page: number
  ): Promise<{ total: number; itens: any[] }>;
  returnItem(id: string): Promise<object>;
  searchByGenre(genre: string[], typeItem: string, id: string): Promise<object>;
  listByGenre(genre: string, limit: number, page: number): Promise<object>;
}
