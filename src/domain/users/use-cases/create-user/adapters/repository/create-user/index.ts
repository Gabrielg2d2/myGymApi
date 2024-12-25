import { AdapterPrisma } from "@/domain/adapters/repository/prisma";
import { Prisma } from "@prisma/client";
import { IDataResponse } from "../../../repository";

interface IAdapterRepository {
  userCreate(data: IDataResponse): Promise<IDataResponse>;
  userFindUnique(email: string): Promise<IDataResponse | null>;
}

export class AdapterRepositoryCreateUser implements IAdapterRepository {
  constructor(private readonly db = new AdapterPrisma()) {}

  async userCreate(data: Prisma.UserCreateInput) {
    try {
      const result = await this.db.prisma.user.create({
        data,
      });
      return result;
    } finally {
      await this.db.prisma.$disconnect();
    }
  }

  async userFindUnique(email: string) {
    try {
      const result = await this.db.prisma.user.findUnique({
        where: { email },
      });
      return result;
    } finally {
      await this.db.prisma.$disconnect();
    }
  }
}
