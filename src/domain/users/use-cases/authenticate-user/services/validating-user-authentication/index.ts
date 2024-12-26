import { ValidatingUserAuthentication } from "../../adapters/validation/validating-user-authentication";
import { IDataRequest } from "../../repository";

interface IServiceValidationAuthenticateUser {
  execute(data: IDataRequest): Promise<boolean>;
}

export class ServiceValidationAuthenticateUser
  implements IServiceValidationAuthenticateUser
{
  async execute(data: IDataRequest) {
    return await new ValidatingUserAuthentication().execute(data);
  }
}
