import { prisma } from "@/lib/prisma";
import { IDataCreate, IUsersRepository } from "./interface";

export class Repository implements IUsersRepository {
  constructor(private readonly dbAdapter = prisma) {}

  async create(data: IDataCreate) {
    const user = await this.dbAdapter.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      throw new Error("E-mail already exists");
    }

    const newUser = await this.dbAdapter.user.create({
      data,
    });

    return newUser;
  }
}
