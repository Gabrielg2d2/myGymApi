export type IDataRequest = {
  name: string;
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

export interface IRepositoryCreateUser {
  execute(data: IDataRequest): Promise<IDataResponse>;
}
