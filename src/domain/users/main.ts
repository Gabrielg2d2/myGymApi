import { CreateUserUseCase, ICreateUserUseCase } from "./use-cases/create-user";

export class UsersDomain {
  async createUser(body: ICreateUserUseCase) {
    const createUserUseCase = new CreateUserUseCase();
    return await createUserUseCase.execute(body);
  }
}
