import { CustomErrorService } from "@/domain/@global/class/errors/service";
import { IReturnDefaultDomainGlobal } from "@/domain/@global/types/return-default-domain";

interface IErrorsCreateCheckIn {
  execute(error: Error | unknown): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class ErrorsCreateCheckIn extends Error implements IErrorsCreateCheckIn {
  async execute(error: Error | unknown) {
    return new CustomErrorService().execute(error);
  }
}
