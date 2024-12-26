import { ValidatingUserAuthentication } from "../../adapters/validation/validating-user-authentication";
import { IUser } from "../../repository/interface";

interface IServiceValidationAuthenticateUser {
  execute(user: IUser, password: string): Promise<void>;
}

export class ServiceValidationAuthenticateUser
  implements IServiceValidationAuthenticateUser
{
  async execute(user: IUser, password: string) {
    return await new ValidatingUserAuthentication().execute(user, password);
  }
}
