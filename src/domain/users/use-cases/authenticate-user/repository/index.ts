import { AdapterRepositoryAuthenticateUser } from "../adapters/repository/find-by-email";
import {
  IDataRequest,
  IDataResponse,
  IRepositoryAuthenticateUser,
} from "./interface";

export type { IDataRequest, IDataResponse };

export class RepositoryAuthenticateUser implements IRepositoryAuthenticateUser {
  constructor(
    private readonly adapter = new AdapterRepositoryAuthenticateUser()
  ) {}

  async execute(data: IDataRequest) {
    const { user } = await this.adapter.findUserByEmail(data);

    return {
      user,
    };
  }
}
