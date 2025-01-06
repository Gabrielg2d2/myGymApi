import { AdapterPrisma } from "@/domain/@adapters/repository/prisma";

import { IRepositoryUsers, IRequestCreateUser } from "../interface";

export class RepositoryUsers implements IRepositoryUsers {
  constructor(private readonly db = new AdapterPrisma()) {}

  async getUserById(id: string) {
    const result = await this.db.prisma.user.findUnique({
      where: { id },
    });

    return result;
  }

  async getUserByEmail(email: string) {
    const result = await this.db.prisma.user.findUnique({
      where: { email },
    });
    return result;
  }

  async createUser(data: IRequestCreateUser) {
    const result = await this.db.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password_hash: data.password,
      },
    });

    return result;
  }
}
