import { ResultOperation } from "../../../interfaces/resultOperation.ts";
import { MongoUserRepository } from "../../../repositories/implementations/MongoUserRepository.ts";
import TokenService from "../../../security/tokenService.ts";
import { UserLoginDTO } from "./LoginDTO.ts";
import bcrypt from "bcrypt";

export class UserLoginUseCase {
  constructor(
    private mongoUserRepository: MongoUserRepository,
    private tokenService = new TokenService(process.env.TOLKEN_SECRET_KEY || "")
  ) {}

  async execute(data: UserLoginDTO): Promise<ResultOperation> {
    try {
      const dataUser = await this.mongoUserRepository.searchingByEmail(
        data.email
      );

      if (!dataUser) {
        return {
          status: "error",
          mensagem: "Credenciais invalidas!",
        };
      } else {
        if (dataUser.email !== data.email) {
          return {
            status: "error",
            mensagem: "Credenciais invalidas!",
          };
        } else {
          const passwordCorrect = await bcrypt.compare(
            data.password,
            dataUser.password
          );
          if (passwordCorrect) {
            const token = this.tokenService.gerarToken({
              usuarioId: data.email,
              papel: dataUser.type,
            });

            return {
              status: "success",
              token: token,
              type: dataUser.type,
            };
          } else {
            return {
              status: "error",
              mensagem: "Credenciais invalidas!",
            };
          }
        }
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
