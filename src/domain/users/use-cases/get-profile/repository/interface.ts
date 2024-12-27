export type IUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

export interface IRepositoryGetProfileUseCase {
  execute(userId: string): Promise<IUser | null>;
}
