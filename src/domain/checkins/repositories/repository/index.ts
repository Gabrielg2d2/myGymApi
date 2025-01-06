import { AdapterPrisma } from "@/domain/@adapters/repository/prisma";

import { ICheckIn, IDataRequest, IRepositoryCheckIn } from "../interface";

export type { ICheckIn, IDataRequest };

export class RepositoryCheckIn implements IRepositoryCheckIn {
  constructor(private readonly db = new AdapterPrisma()) {}

  async create({ gymId, userId }: IDataRequest) {
    const checkIn = await this.db.prisma.checkIn.create({
      data: {
        gym_id: gymId,
        user_id: userId,
      },
    });

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSomeDate = await this.db.prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: date,
      },
    });

    if (!checkInOnSomeDate) return null;

    return checkInOnSomeDate;
  }
}
