/* eslint-disable @typescript-eslint/no-unused-vars */
import { IUserGlobal } from "@/domain/@global/types/user";
import { IRepositoryUsers, IRequestCreateUser } from "../interface";

export class RepositoryUserTest implements IRepositoryUsers {
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
    try {
      return this.users;
    } catch (error) {
      throw new Error("RepositoryUserTest: Error to get users");
    }
  }

  async getUserById(id: string) {
    try {
      const result = this.users.find((user) => user.id === id);
      if (!result) {
        return null;
      }

      return result;
    } catch (error) {
      throw new Error("RepositoryUserTest: Error to get user by id");
    }
  }

  async getUserByEmail(email: string) {
    try {
      const result = this.users.find((user) => user.email === email);
      if (!result) {
        return null;
      }

      return result;
    } catch (error) {
      throw new Error("RepositoryUserTest: Error to get user by email");
    }
  }

  async createUser(data: IRequestCreateUser) {
    try {
      const user: IUserGlobal = {
        id: new Date().getTime().toString(),
        name: data.name,
        email: data.email,
        password_hash: data.password,
        created_at: new Date(),
      };

      this.users.push(user);

      return user;
    } catch (error) {
      throw new Error("RepositoryUserTest: Error to create user");
    }
  }
}
