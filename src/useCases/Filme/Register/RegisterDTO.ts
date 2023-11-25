export interface IFilmeRequestDTO {
  name: string;
  visa: boolean;
  duration: string;
  lauch: string;
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
