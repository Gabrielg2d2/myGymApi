import { AdapterPrisma } from "@/domain/adapters/repository/prisma";
import { IRepositoryUsers, IRequestCreateUser } from "../interface";

export class RepositoryUsers implements IRepositoryUsers {
  constructor(private readonly adapter = new AdapterPrisma()) {}

  async getUserById(id: string) {
    try {
      const result = await this.adapter.prisma.user.findUnique({
        where: { id },
      });
      return result;
    } catch (error) {
      // TODO: Implementar log
      console.log(error);
      return null;
    } finally {
      await this.adapter.prisma.$disconnect();
    }
  }

  async getUserByEmail(email: string) {
    try {
      const result = await this.adapter.prisma.user.findUnique({
        where: { email },
      });
      return result;
    } catch (error) {
      // TODO: Implementar log
      console.log(error);
      return null;
    } finally {
      await this.adapter.prisma.$disconnect();
    }
  }

  async createUser(data: IRequestCreateUser) {
    try {
      const result = await this.adapter.prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password_hash: data.password,
        },
      });
      return result;
    } catch (error) {
      // TODO: Implementar log
      console.log(error);
      return null;
    } finally {
      await this.adapter.prisma.$disconnect();
    }
  }
}
