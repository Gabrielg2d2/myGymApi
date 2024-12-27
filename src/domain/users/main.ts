import { IReturnDefaultDomain } from "../global/types/return-default-domain";
import { AuthenticateUserUseCase } from "./use-cases/authenticate-user/main";
import {
  CreateUserUseCase,
  IDataRequest as IDataCreateUserRequest,
  IDataResponse as IDataCreateUserResponse,
} from "./use-cases/create-user/main";

export type { IDataCreateUserRequest, IDataCreateUserResponse };

interface IUsersDomain {
  createUser(
    body: IDataCreateUserRequest
  ): Promise<IReturnDefaultDomain<IDataCreateUserResponse | null>>;
}

export class UsersDomain implements IUsersDomain {
  async createUser(body: IDataCreateUserRequest) {
    return await new CreateUserUseCase().execute(body);
  }

  async authenticateUser(body: IDataCreateUserRequest) {
    return await new AuthenticateUserUseCase().execute(body);
  }
}
