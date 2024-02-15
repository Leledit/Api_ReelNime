export interface ResultOperation {
  status: "success" | "error";
  mensagem?: string;
  token?: string;
  type?:string,
}
