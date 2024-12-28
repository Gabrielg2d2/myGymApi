import { AdapterBcryptjs } from "@/domain/adapters/hash/bcryptjs";
import { IUserGlobal } from "@/domain/global/types/user";

interface IValidatingUserAuthentication {
  execute(user: IUserGlobal, password: string): Promise<boolean>;
}

export class ServiceValidatingUserAuthentication
  implements IValidatingUserAuthentication
{
  constructor(private readonly adapter = new AdapterBcryptjs()) {}

  async execute(user: IUserGlobal, password: string) {
    const isPasswordValid = await this.adapter.bcryptjs.compare(
      password,
      user.password_hash
    );

    return isPasswordValid;
  }
}
