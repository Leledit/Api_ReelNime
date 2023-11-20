export interface IAnimesRequestDTO {
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
  genres: string[];
  dataImg?: {
    fieldname: string;
    originalname: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };
}
