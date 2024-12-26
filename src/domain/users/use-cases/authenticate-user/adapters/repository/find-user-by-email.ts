import { AdapterPrisma } from "@/domain/adapters/repository/prisma";
import { IDataRequest } from "../../repository";
import { IUser } from "../../repository/interface";

interface IFindUserByEmail {
  findUserByEmail(data: IDataRequest): Promise<IUser>;
}

export class AdapterRepositoryAuthenticateUser implements IFindUserByEmail {
  constructor(private readonly db = new AdapterPrisma()) {}

  async findUserByEmail(data: IDataRequest) {
    const user = await this.db.prisma.user.findUnique({
      where: { email: data.email },
    });

    return user;
  }
}
