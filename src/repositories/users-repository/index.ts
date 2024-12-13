import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export class UsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw new Error("E-mail already exists");
    }

    const newUser = await prisma.user.create({
      data,
    });

    return newUser;
  }
}
