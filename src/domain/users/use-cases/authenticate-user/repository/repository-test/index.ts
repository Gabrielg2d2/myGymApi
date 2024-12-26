import { IDataRequest, IRepositoryAuthenticateUser, IUser } from "../interface";

export class RepositoryTest implements IRepositoryAuthenticateUser {
  users: IUser[] = [
    {
      id: new Date().getTime().toString(),
      name: "Test",
      email: "test@gmail",
      password_hash: new Date().getTime().toString(),
      created_at: new Date(),
    },
  ];

  async execute(data: IDataRequest) {
    const user = this.users.find((user) => user?.email === data.email);

    if (!user) {
      return null;
    }

    return user;
  }
}
