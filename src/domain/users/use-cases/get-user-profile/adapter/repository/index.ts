import { AdapterPrisma } from "@/domain/adapters/repository/prisma";

type IUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

interface IGetProfileRepository {
  getUserById(userId: string): Promise<IUser | null>;
}

export class AdapterGetProfileRepository implements IGetProfileRepository {
  constructor(private readonly db = new AdapterPrisma()) {}

  getUserById(userId: string) {
    return this.db.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  }
}
