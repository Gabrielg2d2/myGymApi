import { env } from "@/env";
import { Prisma, PrismaClient } from "@prisma/client";

interface IAdapterRepository {
  userCreate(data: Prisma.UserCreateInput): Promise<Prisma.UserCreateInput>;
  userFindUnique(email: string): Promise<Prisma.UserCreateInput | null>;
}

export class PrismaAdapter implements IAdapterRepository {
  constructor(
    private readonly db = new PrismaClient({
      log:
        env.NODE_ENV === "development"
          ? ["query", "info", "warn", "error"]
          : ["warn", "error"],
    })
  ) {}

  async userCreate(data: Prisma.UserCreateInput) {
    return await this.db.user.create({
      data,
    });
  }

  async userFindUnique(email: string) {
    return await this.db.user.findUnique({
      where: { email },
    });
  }
}
