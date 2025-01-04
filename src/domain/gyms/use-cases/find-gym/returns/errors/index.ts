import { CustomErrorService } from "@/domain/@global/class/errors/service";
import { IReturnDefaultDomainGlobal } from "@/domain/@global/types/return-default-domain";

interface IErrorsFindGym {
  execute(error: Error | unknown): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class ErrorsFindGym extends Error implements IErrorsFindGym {
  async execute(error: Error | unknown) {
    return new CustomErrorService().execute(error);
  }
}
