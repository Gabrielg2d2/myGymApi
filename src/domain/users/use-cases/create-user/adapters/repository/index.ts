import { PrismaAdapter } from "@/domain/adapters/repository/prisma";
import { Prisma } from "@prisma/client";

interface IAdapterRepository {
  userCreate(data: Prisma.UserCreateInput): Promise<Prisma.UserCreateInput>;
  userFindUnique(email: string): Promise<Prisma.UserCreateInput | null>;
}

export class AdapterRepositoryCreateUser implements IAdapterRepository {
  constructor(private readonly db = new PrismaAdapter()) {}

  async userCreate(data: Prisma.UserCreateInput) {
    try {
      const result = await this.db.prisma.user.create({
        data,
      });
      await this.db.prisma.$disconnect();
      return result;
    } finally {
      await this.db.prisma.$disconnect();
    }
  }

  async userFindUnique(email: string) {
    try {
      const result = await this.db.prisma.user.findUnique({
        where: { email },
      });
      await this.db.prisma.$disconnect();
      return result;
    } finally {
      await this.db.prisma.$disconnect();
    }
  }
}
