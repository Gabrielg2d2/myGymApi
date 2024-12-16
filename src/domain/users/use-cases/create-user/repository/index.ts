import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type IDataCreate = Prisma.UserCreateInput;

type IUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

export class RepositoryCreateUser {
  constructor(private readonly dbAdapter = prisma) {}

  async execute(data: IDataCreate): Promise<IUser> {
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
