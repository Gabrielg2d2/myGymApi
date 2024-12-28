import {
  AuthenticateUserUseCase,
  IDataRequest as IDataAuthenticateRequest,
  IReturnAuthenticateUser,
} from "./use-cases/authenticate-user/main";
import {
  CreateUserUseCase,
  IDataRequest as IDataCreateUserRequest,
  IReturnCreateUserUseCase,
} from "./use-cases/create-user/main";
import {
  GetProfileUseCase,
  IDataRequest as IDataGetProfileRequest,
  IDataResponse as IDataGetProfileResponse,
  IReturnDefaultGetProfile,
} from "./use-cases/get-profile/main";

export type {
  IDataAuthenticateRequest,
  IDataCreateUserRequest,
  IDataGetProfileRequest,
  IDataGetProfileResponse,
};

interface IUsersDomain {
  createUser(body: IDataCreateUserRequest): IReturnCreateUserUseCase;
  authenticateUser(body: IDataAuthenticateRequest): IReturnAuthenticateUser;
  getProfile(body: IDataGetProfileRequest): IReturnDefaultGetProfile;
}

export class UsersDomain implements IUsersDomain {
  async createUser(body: IDataCreateUserRequest) {
    return await new CreateUserUseCase().execute(body);
  }

  async authenticateUser(body: IDataAuthenticateRequest) {
    return await new AuthenticateUserUseCase().execute(body);
  }

  async getProfile(body: IDataGetProfileRequest) {
    return await new GetProfileUseCase().execute(body);
  }
}
