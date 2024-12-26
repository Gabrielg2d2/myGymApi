import { AdapterPrisma } from "@/domain/adapters/repository/prisma";
import { IDataRequest } from "../../repository";

export class AdapterRepositoryAuthenticateUser {
  constructor(private readonly db = new AdapterPrisma()) {}

  async findByEmail(data: IDataRequest) {
    const user = await this.db.prisma.user.findUnique({
      where: { email: data.email },
    });

    return {
      user,
    };
  }
}
