import { AdapterPrisma } from "@/domain/adapters/repository/prisma";
import { IUserGlobal } from "@/domain/global/types/user";
import { IRepositoryUser } from "../interface";

export class RepositoryUser implements IRepositoryUser {
  constructor(private readonly adapter = new AdapterPrisma()) {}

  async getUserById(id: string) {
    try {
      const result = await this.adapter.prisma.user.findUnique({
        where: { id },
      });
      return result;
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
    } finally {
      await this.adapter.prisma.$disconnect();
    }
  }

  async createUser(data: IUserGlobal) {
    try {
      const result = await this.adapter.prisma.user.create({
        data,
      });
      return result;
    } finally {
      await this.adapter.prisma.$disconnect();
    }
  }
}
