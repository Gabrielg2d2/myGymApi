import { CustomErrorGlobal } from "@/domain/global/class/errors/custom";
import { AdapterValidationCreateUser } from "../../adapters/validation/create-user";
import { IDataRequest } from "../../repository";

interface IServiceValidationCreateUser {
  execute(body: IDataRequest): Promise<void>;
}

export class ServiceValidationCreateUser
  implements IServiceValidationCreateUser
{
  public async execute(body: IDataRequest) {
    const { isBodyValid, fieldErrors } =
      await new AdapterValidationCreateUser().execute(body);

    if (!isBodyValid) {
      throw new CustomErrorGlobal({
        message: "Error: Invalid content",
        details: fieldErrors,
      });
    }
  }
}
