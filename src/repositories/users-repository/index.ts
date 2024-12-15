import { prisma } from "@/lib/prisma";
import { IDataCreate, IUsersRepository } from "./interface-users";

export class UsersRepository implements IUsersRepository {
  constructor(private readonly db = prisma) {}

  async create(data: IDataCreate) {
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
