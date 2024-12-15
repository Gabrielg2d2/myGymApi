import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class UsersRepository {
  constructor(private readonly db = prisma) {}

  async create(data: Prisma.UserCreateInput) {
    const user = await this.db.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw new Error("E-mail already exists");
    }

    const newUser = await this.db.user.create({
      data,
    });

    return newUser;
  }
}
