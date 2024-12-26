export type IDataRequest = {
  email: string;
  password: string;
};
export type IDataResponse = void;

export interface IRepositoryAuthenticateUser {
  execute(data: IDataRequest): Promise<IDataResponse>;
}
