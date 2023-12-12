import { User } from "../entities/User";

export interface IUserRepository {
  register(user: User): Promise<boolean>;
  login(user: User): Promise<boolean>;
  searchingByEmail(email: string): Promise<undefined | User>;
}
