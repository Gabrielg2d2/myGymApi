import { CustomErrorGlobal } from "@/domain/global/class-custom-error";
import { AdapterRepositoryCreateUser } from "../adapters/repository";

export type IDataRequest = {
  name: string;
  email: string;
  password: string;
};

export type IDataResponse = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

interface IRepositoryCreateUser {
  execute(data: IDataRequest): Promise<IDataResponse>;
}

export class RepositoryCreateUser implements IRepositoryCreateUser {
  constructor(private readonly dbAdapter = new AdapterRepositoryCreateUser()) {}

  async execute(data: IDataRequest) {
    const user = await this.dbAdapter.userFindUnique(data.email);

    if (user) {
      throw new CustomErrorGlobal({
        message: "Error: User already exists",
      });
    }

    const newUser = await this.dbAdapter.userCreate({
      name: data.name,
      email: data.email,
      password_hash: data.password,
    });

    return newUser;
  }
}
