
export interface IAnimeRegisterDTO {
  id?: string | undefined;
  qtdEpisodes: number;
  releaseYear: number;
  name: string;
  synopsis: string;
  nextSeason: string;
  previousSeason: string;
  watched: boolean;
  updateDate?: Date;
  status: string;
  note: number;
  img: string;
}
