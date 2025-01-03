type ICheckIn = {
  id: string;
  validated_at: Date | null;
  created_at: Date;
  user_id: string;
  gym_id: string;
};

export interface IRepositoryCheckIn {
  create(userId: string, gymId: string): Promise<ICheckIn>;
}
