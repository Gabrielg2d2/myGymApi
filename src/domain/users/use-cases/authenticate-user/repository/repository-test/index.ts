import { AdapterBcryptjs } from "@/domain/adapters/hash/bcryptjs";
import { IDataRequest, IRepositoryAuthenticateUser, IUser } from "../interface";

export class RepositoryTest implements IRepositoryAuthenticateUser {
  constructor(private readonly adapter = new AdapterBcryptjs()) {}

  users: IUser[] = [
    {
      id: new Date().getTime().toString(),
      name: "Test",
      email: "test@gmail.com",
      password_hash: "123123",
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
