export interface IFilmeRequestDTO {
  name: string;
  visa: boolean;
  duration: string;
  releaseYear: number,
  note: number;
  synopsis: string;
  dataImg?: {
    fieldname: string;
    originalname: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
  };
}
