import { AdapterPrisma } from "@/domain/adapters/repository/prisma";
import { IRepositoryUser, IRequestCreateUser } from "../interface";

export class RepositoryUsers implements IRepositoryUser {
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
    } finally {
      await this.adapter.prisma.$disconnect();
    }
  }
}
