import { CustomErrorGlobal } from "@/domain/global/class/errors/custom";
import { AdapterValidatingUserAuthentication } from "../../adapters/validation/validating-user-authentication";
import { IUser } from "../../repository/interface";

interface IServiceValidationAuthenticateUser {
  execute(user: IUser, password: string): Promise<void>;
}

export class ServiceValidationAuthenticateUser
  implements IServiceValidationAuthenticateUser
{
  async execute(user: IUser, password: string) {
    const customError = new CustomErrorGlobal({
      message: "Error: Credentials are invalid",
    });

    if (!user?.password_hash || !password) throw customError;

    const isPasswordValid =
      await new AdapterValidatingUserAuthentication().execute(user, password);

    if (!isPasswordValid) throw customError;
  }
}
