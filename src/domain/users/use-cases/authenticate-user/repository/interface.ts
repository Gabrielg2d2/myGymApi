export type IDataRequest = void;
export type IDataResponse = void;

export interface IRepositoryAuthenticateUser {
  execute(data: IDataRequest): Promise<IDataResponse>;
}
