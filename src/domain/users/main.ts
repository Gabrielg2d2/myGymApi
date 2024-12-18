import { IReturnDefaultDomain } from "../global/types/return-default-domain";
import { CreateUserUseCase, ICreateUserUseCase } from "./use-cases/create-user";
import { IDataUser } from "./use-cases/create-user/repository";

interface IUsersDomain {
  createUser(
    body: ICreateUserUseCase
  ): Promise<IReturnDefaultDomain<IDataUser | null>>;
}

export class UsersDomain {
  async createUser(body: ICreateUserUseCase) {
    return await new CreateUserUseCase().execute(body);
  }
}
