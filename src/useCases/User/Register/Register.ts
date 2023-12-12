import { User } from "../../../entities/User.ts";
import { MongoUserRepository } from "../../../repositories/implementations/MongoUserRepository.ts";
import { RegisterUserDTO } from "./RegisterDTO.ts";
import bcrypt from "bcrypt";

export class RegisterUserUseCase {
  constructor(private mongoUserRepository: MongoUserRepository) {}
  async execute(data: RegisterUserDTO): Promise<boolean | string> {
    try {
      //verificando se o email ja estava cadastrado no sistema
      const isRegistered =
        await this.mongoUserRepository.searchingByEmail(data.email);

      if (isRegistered) {
        return "Email ja cadastrado no sistema";
      }

      //Criando o hast da senha
      const salt = await bcrypt.genSalt(10);
      const hashSenha = await bcrypt.hash(data.password, salt);

      //Cadastrando um novo usuario
      const dataUser = new User({
        email: data.email,
        password: hashSenha,
      });

      const resultRequest = await this.mongoUserRepository.register(dataUser);

      if (resultRequest) {
        return true;
      } else {
        return "Problemas ao cadastrar um novo usuario";
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
