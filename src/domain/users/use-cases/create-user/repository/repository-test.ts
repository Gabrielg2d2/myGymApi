import { CustomErrorGlobal } from "@/domain/global/class-custom-error";
import {
  IDataRequest,
  IDataResponse,
  IRepositoryCreateUser,
} from "./interfaces";

export class RepositoryTest implements IRepositoryCreateUser {
  private users: IDataResponse[] = [];

  async execute(data: IDataRequest) {
    const user = this.users.find((user) => user.email === data.email);

    if (user) {
      throw new CustomErrorGlobal({
        message: "Error: User already exists",
      });
    }

    const newUser = {
      id: new Date().getTime().toString(),
      name: data.name,
      email: data.email,
      password_hash: data.password,
      created_at: new Date(),
    };

    this.users.push(newUser);

    return newUser;
  }
}
