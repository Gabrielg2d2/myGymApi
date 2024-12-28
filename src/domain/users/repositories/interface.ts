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

export interface IRepositoryUser {
  getUserById(id: string): Promise<IUser>;
  getUserByEmail(email: string): Promise<IUser>;
  createUser(data: IUser): Promise<IUser>;
}
