import { CustomErrorGlobal } from "@/domain/global/class/errors/custom";
import { IUserGlobal } from "@/domain/global/types/user";
import { AdapterValidatingUserAuthentication } from "../../adapters/validation/validating-user-authentication";

interface IServiceValidationAuthenticateUser {
  execute(user: IUserGlobal | null, password: string): Promise<void>;
}

export class ServiceValidationAuthenticateUser
  implements IServiceValidationAuthenticateUser
{
  async execute(user: IUserGlobal | null, password: string) {
    const customError = new CustomErrorGlobal({
      message: "Error: Credentials are invalid",
    });

    if (!user) throw customError;

    const isPasswordValid =
      await new AdapterValidatingUserAuthentication().execute(user, password);

    if (!isPasswordValid) throw customError;
  }
}
