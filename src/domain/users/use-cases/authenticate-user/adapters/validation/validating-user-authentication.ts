import { AdapterBcryptjs } from "@/domain/adapters/hash/bcryptjs";
import { IUser } from "../../repository/interface";

interface IValidatingUserAuthentication {
  execute(user: IUser, password: string): Promise<boolean>;
}

export class AdapterValidatingUserAuthentication
  implements IValidatingUserAuthentication
{
  constructor(private readonly adapter = new AdapterBcryptjs()) {}

  async execute(user: IUser, password: string) {
    if (!user?.password_hash || !password) return false;

    const isPasswordValid = await this.adapter.bcryptjs.compare(
      password,
      user.password_hash
    );

    return isPasswordValid;
  }
}
