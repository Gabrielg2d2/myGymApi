import { CustomErrorGlobal } from "@/domain/global/class/errors/custom";
import { AdapterRepositoryCreateUser } from "../adapters/repository/create-user";
import {
  IDataRequest,
  IDataResponse,
  IRepositoryCreateUser,
} from "./interfaces";

export { IDataRequest, IDataResponse };
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
