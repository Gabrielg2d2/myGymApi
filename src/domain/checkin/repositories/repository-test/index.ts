import { randomUUID } from "node:crypto";
import { ICheckIn, IDataRequest, IRepositoryCheckIn } from "../interface";

export class RepositoryCheckInTest implements IRepositoryCheckIn {
  private checkIns: ICheckIn[] = [];

  async create(data: IDataRequest) {
    const checkIn: ICheckIn = {
      id: randomUUID(),
      created_at: new Date(),
      user_id: data.userId,
      gym_id: data.gymId,
      validated_at: data.validatedAt ? new Date(data.validatedAt) : null,
    };

    this.checkIns.push(checkIn);

    return checkIn;
  }
}
