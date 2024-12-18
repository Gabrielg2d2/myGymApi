import { CustomErrorGlobal } from "@/domain/global/class-custom-error";
import { Prisma } from "@prisma/client";
import { AdapterRepositoryCreateUser } from "../adapters/repository";

type IDataCreate = Prisma.UserCreateInput;

export type IDataUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

export class RepositoryCreateUser {
  constructor(private readonly dbAdapter = new AdapterRepositoryCreateUser()) {}

  async execute(data: IDataCreate) {
    try {
      const user = await this.dbAdapter.userFindUnique(data.email);

      if (user) {
        throw new CustomErrorGlobal("Error: User already exists");
      }

      const newUser = await this.dbAdapter.userCreate(data);

      return newUser;
    } catch (error) {
      // TODO: Analisar a necessidade de desconectar o prisma
      throw new CustomErrorGlobal(error.message);
    }
  }
}
