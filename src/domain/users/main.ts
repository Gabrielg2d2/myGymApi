import { IReturnDefaultDomain } from "../global/types/return-default-domain";
import {
  CreateUserUseCase,
  IDataRequest as IDataCreateUserRequest,
  IDataResponse as IDataCreateUserResponse,
} from "./use-cases/create-user";

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
}
