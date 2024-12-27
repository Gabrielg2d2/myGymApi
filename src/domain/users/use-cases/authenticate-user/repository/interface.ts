export type IDataRequest = {
  email: string;
  password: string;
};

export type IDataResponse = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
} | null;

export type IUser = IDataResponse;

export interface IRepositoryAuthenticateUser {
  execute(data: IDataRequest): Promise<IUser>;
}
