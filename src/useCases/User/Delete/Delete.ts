import { StorageFirebase } from "../../../providers/IStorageFirebase.ts";
import { MongoUserRepository } from "../../../repositories/implementations/MongoUserRepository.ts";
import { IUserDeleteDTO } from "./DeleteDTO.ts";

export class UserDeleteUseCase {
  constructor(private mongoUserRepository: MongoUserRepository) {}
  async execute(data: IUserDeleteDTO) {
    try {
      await this.mongoUserRepository.delete(data.id);
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
