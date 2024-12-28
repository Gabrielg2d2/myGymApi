import { IUserGlobal } from "@/domain/global/types/user";
import { IRepositoryUser, IRequestCreateUser } from "../interface";

export class RepositoryUserTest implements IRepositoryUser {
  private users: IUserGlobal[] = [
    {
      id: "123123123",
      name: "Test User",
      email: "test@gmail.com",
      password_hash:
        "$2a$06$NKPokWEEGykqDgrEqVnxge5q8xhKnCI7UfayPjdHZHJnovITMZE1y", // 123456
      created_at: new Date(),
    },
  ];

  async getUserById(id: string) {
    const result = this.users.find((user) => user.id === id);
    if (!result) {
      return null;
    }

    return result;
  }

  async getUserByEmail(email: string) {
    const result = this.users.find((user) => user.email === email);
    if (!result) {
      return null;
    }

    return result;
  }

  async createUser(data: IRequestCreateUser) {
    const user: IUserGlobal = {
      id: "123123123",
      name: data.name,
      email: data.email,
      password_hash: data.password,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }
}
