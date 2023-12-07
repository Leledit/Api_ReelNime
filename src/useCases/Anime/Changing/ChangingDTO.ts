export interface IAnimesRequestDTO {
  id: string;
  qtdEpisodes: number;
  releaseYear: number;
  name: string;
  synopsis: string;
  nextSeason: string;
  previousSeason: string;
  watched: boolean;
  note: number;
  status: string;
  dataImg?: {
    fieldname: string;
    originalname: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };
}
