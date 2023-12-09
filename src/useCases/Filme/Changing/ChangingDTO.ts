export interface IFilmeRequestDTO {
  id: string;
  name: string;
  visa: boolean;
  duration: string;
  releaseYear: number,
  lauch: string;
  note: number;
  synopsis: string;
  genres: string[],
  dataImg?: {
    fieldname: string;
    originalname: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };
}
