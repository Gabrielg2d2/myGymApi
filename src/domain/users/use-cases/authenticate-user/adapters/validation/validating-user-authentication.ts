import { AdapterBcryptjs } from "@/domain/adapters/hash/bcryptjs";
import { CustomErrorGlobal } from "@/domain/global/class-custom-error";
import { IUser } from "../../repository/interface";

interface IValidatingUserAuthentication {
  execute(user: IUser, password: string): Promise<void>;
}

export class ValidatingUserAuthentication
  implements IValidatingUserAuthentication
{
  constructor(private readonly adapter = new AdapterBcryptjs()) {}

  async execute(user: IUser, password: string) {
    if (!user || !password)
      throw new CustomErrorGlobal({
        message: "Error: Credentials are invalid",
      });

    const { password_hash } = user;

    const isPasswordValid = await this.adapter.bcryptjs.compare(
      password,
      password_hash
    );

    if (!isPasswordValid)
      throw new CustomErrorGlobal({
        message: "Error: Credentials are invalid",
      });
  }
}
