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
};

export type IUser = IDataResponse | null;

export interface IRepositoryAuthenticateUser {
  execute(data: IDataRequest): Promise<{
    user: IUser;
  }>;
}
