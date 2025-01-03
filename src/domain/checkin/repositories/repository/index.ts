import { AdapterPrisma } from "@/domain/@adapters/repository/prisma";
import { IDataRequest, IRepositoryCheckIn } from "../interface";

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
}
