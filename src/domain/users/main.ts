import {
  AuthenticateUserUseCase,
  IDataRequest as IDataAuthenticateRequest,
  IReturnAuthenticateUser,
} from "./use-cases/authenticate-user/main";
import {
  CreateUserUseCase,
  IDataRequest as IDataCreateUserRequest,
  IDataResponse as IDataCreateUserResponse,
  IReturnCreateUserUseCase,
} from "./use-cases/create-user/main";

export type { IDataCreateUserRequest, IDataCreateUserResponse };

interface IUsersDomain {
  createUser(body: IDataCreateUserRequest): IReturnCreateUserUseCase;

  authenticateUser(body: IDataAuthenticateRequest): IReturnAuthenticateUser;
}

export class UsersDomain implements IUsersDomain {
  async createUser(body: IDataCreateUserRequest) {
    return await new CreateUserUseCase().execute(body);
  }

  async authenticateUser(body: IDataAuthenticateRequest) {
    return await new AuthenticateUserUseCase().execute(body);
  }
}
