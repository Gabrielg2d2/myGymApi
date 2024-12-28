import { CustomErrorService } from "@/domain/global/class/errors/service";
import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";

interface IErrorsGetProfile {
  execute(error: Error | unknown): Promise<IReturnDefaultDomain<null>>;
}

export class ErrorsGetProfile extends Error implements IErrorsGetProfile {
  async execute(error: Error | unknown) {
    return new CustomErrorService().execute(error);
  }
}
