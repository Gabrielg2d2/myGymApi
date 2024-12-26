import { AdapterBcryptjs } from "@/domain/adapters/hash/bcryptjs";
import { env } from "@/env";
import { IDataRequest, IRepositoryAuthenticateUser, IUser } from "../interface";

export class RepositoryTest implements IRepositoryAuthenticateUser {
  private password = "123123";

  constructor(private readonly adapter = new AdapterBcryptjs()) {}

  users: IUser[] = [];

  async execute(data: IDataRequest) {
    const passwordHash = await this.adapter.bcryptjs.hash(
      this.password,
      env.HASH_SALT
    );

    this.users.push({
      id: new Date().getTime().toString(),
      name: "Test",
      email: "test@gmail.com",
      password_hash: passwordHash,
      created_at: new Date(),
    });

    const user = this.users.find((user) => user?.email === data.email);

    if (!user) {
      return null;
    }

    return user;
  }
}
