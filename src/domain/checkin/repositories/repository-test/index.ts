import { ICheckIn, IDataRequest, IRepositoryCheckIn } from "../interface";

export class RepositoryCheckInTest implements IRepositoryCheckIn {
  private checkIns: ICheckIn[] = [];

  async create(data: IDataRequest) {
    const checkIn: ICheckIn = {
      id: Math.random().toString(36).substring(7),
      validated_at: null,
      created_at: new Date(),
      user_id: data.userId,
      gym_id: data.gymId,
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }
}
