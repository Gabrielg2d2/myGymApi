export type IDataResponse = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
} | null;

export type IDataRequest = {
  userId: string;
};

export interface IRepositoryGetProfileUseCase {
  execute(userId: IDataRequest): Promise<IDataResponse>;
}
