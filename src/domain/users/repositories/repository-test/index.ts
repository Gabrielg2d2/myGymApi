import { IUserGlobal } from "@/domain/global/types/user";
import { IRepositoryUsers, IRequestCreateUser } from "../interface";
import { RepositoryUsers } from "../repository";

export class RepositoryUserTest
  extends RepositoryUsers
  implements IRepositoryUsers
{
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

  async clearUsers() {
    this.users = [
      {
        id: "123123123",
        name: "Test User",
        email: "test@gmail.com",
        password_hash:
          "$2a$06$NKPokWEEGykqDgrEqVnxge5q8xhKnCI7UfayPjdHZHJnovITMZE1y", // 123456
        created_at: new Date(),
      },
    ];
  }

  async getAllUsers() {
    return this.users;
  }

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
      id: new Date().getTime().toString(),
      name: data.name,
      email: data.email,
      password_hash: data.password,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }
}
