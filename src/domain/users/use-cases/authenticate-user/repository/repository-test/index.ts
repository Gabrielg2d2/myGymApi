import { IDataRequest, IRepositoryAuthenticateUser, IUser } from "../interface";

export class RepositoryTest implements IRepositoryAuthenticateUser {
  users: IUser[] = [
    {
      id: new Date().getTime().toString(),
      name: "Test",
      email: "jhon@gmail",
      password_hash: new Date().getTime().toString(),
      created_at: new Date(),
    },
  ];

  async execute(data: IDataRequest): Promise<{ user: IUser }> {
    const user = this.users.find((user) => user?.email === data.email);

    new Promise((resolve, reject) => {
      if (!user) {
        reject(new Error("User not found"));
      }

      resolve({ user });
    });
  }
}
