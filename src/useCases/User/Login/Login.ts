import { MongoUserRepository } from "../../../repositories/implementations/MongoUserRepository.ts";
import { LoginUserDTO } from "./LoginDTO.ts";
import bcrypt from "bcrypt";

export class LoginUserUseCase {
  constructor(private mongoUserRepository: MongoUserRepository) {}
  async execute(data: LoginUserDTO): Promise<boolean | string> {
    try {
      const dataUser = await this.mongoUserRepository.searchingByEmail(
        data.email
      );

      if (!dataUser) {
        return "Credenciais invalidas!";
      } else {
        if (dataUser.email !== data.email) {
          return "Credenciais invalidas!";
        } else {
          const passwordCorrect = await bcrypt.compare(
            data.password,
            dataUser.password
          );
          if (passwordCorrect) {
            return true;
          } else {
            return "Credenciais invalidas!";
          }
        }
      }
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
