import { CustomErrorGlobal } from "@/domain/global/class-custom-error";
import { AdapterValidatingUserAuthentication } from "../../adapters/validation/validating-user-authentication";
import { IUser } from "../../repository/interface";

interface IServiceValidationAuthenticateUser {
  execute(user: IUser, password: string): Promise<void>;
}

export class ServiceValidationAuthenticateUser
  implements IServiceValidationAuthenticateUser
{
  async execute(user: IUser, password: string) {
    if (!user?.password_hash || !password)
      throw new CustomErrorGlobal({
        message: "Error: Credentials are invalid",
      });

    const isPasswordValid =
      await new AdapterValidatingUserAuthentication().execute(user, password);

    if (!isPasswordValid)
      throw new CustomErrorGlobal({
        message: "Error: Credentials are invalid",
      });
  }
}
