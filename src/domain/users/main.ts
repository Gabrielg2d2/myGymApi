import { ITypeMessageGlobal } from "../global/types/type-message";
import { CreateUserUseCase, ICreateUserUseCase } from "./use-cases/create-user";
import { IDataUser } from "./use-cases/create-user/repository";

interface IUsersDomain {
  createUser(body: ICreateUserUseCase): Promise<{
    data: IDataUser | null;
    message: {
      en: string;
      pt: string;
    };
    typeMessage: ITypeMessageGlobal;
    statusCode: number;
  }>;
}

export class UsersDomain implements IUsersDomain {
  async createUser(body: ICreateUserUseCase) {
    const createUserUseCase = new CreateUserUseCase();
    return await createUserUseCase.execute(body);
  }
}
