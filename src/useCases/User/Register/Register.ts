import { User } from "../../../entities/User.ts";
import { ResultOperation } from "../../../interfaces/resultOperation.ts";
import { MongoUserRepository } from "../../../repositories/implementations/MongoUserRepository.ts";
import TokenService from "../../../security/tokenService.ts";
import { UserRegisterDTO } from "./RegisterDTO.ts";
import bcrypt from "bcrypt";

export class UserRegisterUseCase {
  constructor(
    private mongoUserRepository: MongoUserRepository,
    private tokenService = new TokenService(process.env.TOLKEN_SECRET_KEY || "")
  ) {}
  async execute(data: UserRegisterDTO): Promise<ResultOperation> {
    try {
      //verificando se o email ja estava cadastrado no sistema
      const isRegistered = await this.mongoUserRepository.searchingByEmail(
        data.email
      );

      if (isRegistered) {
        return {
          status: "error",
          mensagem: "Email ja cadastrado no sistema",
        };
      }

      //Criando o hast da senha
      const salt = await bcrypt.genSalt(10);
      const hashSenha = await bcrypt.hash(data.password, salt);

      //Cadastrando um novo usuario
      const dataUser = new User({
        email: data.email,
        name: data.name,
        password: hashSenha,
      });

      const resultRequest = await this.mongoUserRepository.register(dataUser);

      if (resultRequest) {
        const token = this.tokenService.gerarToken({
          usuarioId: data.email,
          papel: dataUser.type,
        });

        return {
          status: "success",
          token: token,
        };
      } else {
        return {
          status: "error",
          mensagem: "Problemas ao cadastrar um novo usuario",
        };
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
