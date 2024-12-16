import { env } from "@/env";
import { Prisma, PrismaClient } from "@prisma/client";

export class PrismaAdapter {
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
