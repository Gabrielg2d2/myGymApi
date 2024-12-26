import {
  IDataRequest,
  IDataResponse,
  IRepositoryAuthenticateUser,
} from "./interface";

export type { IDataRequest, IDataResponse };

export class RepositoryAuthenticateUser implements IRepositoryAuthenticateUser {
  constructor() {}

  execute(data: IDataRequest): Promise<IDataResponse> {
    throw new Error("Method not implemented.");
  }
}
