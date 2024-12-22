import { AdapterValidationCreateUser } from "../../adapters/validation/create-user";
import { IDataRequest } from "../../repository";

interface IServiceValidationCreateUser {
  execute(body: IDataRequest): Promise<void>;
}

export class ServiceValidationCreateUser
  implements IServiceValidationCreateUser
{
  public async execute(body: IDataRequest) {
    return new AdapterValidationCreateUser().execute(body);
  }
}
