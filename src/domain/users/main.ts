import { IReturnDefaultDomain } from "../global/types/return-default-domain";
import { CreateUserUseCase, ICreateUserUseCase } from "./use-cases/create-user";
import { IDataUser } from "./use-cases/create-user/repository";

interface IUsersDomain {
  createUser(body: ICreateUserUseCase): IReturnDefaultDomain<IDataUser>;
}

export class UsersDomain implements IUsersDomain {
  async createUser(body: ICreateUserUseCase) {
    const createUserUseCase = new CreateUserUseCase();
    return await createUserUseCase.execute(body);
  }
}
