import { CustomErrorGlobal } from "@/domain/global/class-custom-error";
import { AdapterRepositoryCreateUser } from "../adapters/repository";

type IDataCreate = {
  name: string;
  email: string;
  password_hash: string;
};

export class RepositoryCreateUser {
  constructor(private readonly dbAdapter = new AdapterRepositoryCreateUser()) {}

  async execute(data: IDataCreate) {
    const user = await this.dbAdapter.userFindUnique(data.email);

    if (user) {
      throw new CustomErrorGlobal({
        message: "Error: User already exists",
      });
    }

    const newUser = await this.dbAdapter.userCreate(data);

    return newUser;
  }
}
