import { Prisma } from "@prisma/client";
import { PrismaAdapter } from "..";

interface IAdapterRepository {
  userCreate(data: Prisma.UserCreateInput): Promise<Prisma.UserCreateInput>;
  userFindUnique(email: string): Promise<Prisma.UserCreateInput | null>;
}

export class AdapterRepositoryUsers implements IAdapterRepository {
  constructor(private readonly db = new PrismaAdapter()) {}

  async userCreate(data: Prisma.UserCreateInput) {
    const result = await this.db.prisma.user.create({
      data,
    });
    await this.db.prisma.$disconnect();
    return result;
  }

  async userFindUnique(email: string) {
    const result = await this.db.prisma.user.findUnique({
      where: { email },
    });
    await this.db.prisma.$disconnect();
    return result;
  }
}