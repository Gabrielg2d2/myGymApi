import { ICreateUserUseCase } from "../..";
import { AdapterValidationCreateUser } from "../../adapters/validation/create-user";

export class ServiceValidationCreateUser {
  public async execute(body: ICreateUserUseCase) {
    return new AdapterValidationCreateUser().execute(body);
  }
}
