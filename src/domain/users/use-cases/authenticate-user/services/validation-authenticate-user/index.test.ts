import { IDataRequest } from "../../repository";

interface IServiceValidationAuthenticateUser {
  execute(data: IDataRequest): boolean;
}

export class ServiceValidationAuthenticateUser
  implements IServiceValidationAuthenticateUser
{
  execute(data: IDataRequest): boolean {
    throw new Error("Method not implemented.");
  }
}
