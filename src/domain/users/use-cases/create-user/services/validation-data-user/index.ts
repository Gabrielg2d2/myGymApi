import { AdapterValidationDataUser } from "@/domain/adapters/zod/users/data-user-create";
import { ICreateUserUseCase } from "../..";

export class ServiceValidationDataUser {
  public async execute(body: ICreateUserUseCase) {
    return new AdapterValidationDataUser().execute(body);
  }
}
