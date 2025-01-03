export type ICheckIn = {
  id: string;
  validated_at: Date | null;
  created_at: Date;
  user_id: string;
  gym_id: string;
};

export type IDataRequest = {
  gymId: string;
  userId: string;
  validatedAt?: Date | null;
};

export interface IRepositoryCheckIn {
  create(data: IDataRequest): Promise<ICheckIn>;
}
