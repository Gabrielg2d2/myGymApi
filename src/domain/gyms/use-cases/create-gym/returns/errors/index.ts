import { CustomErrorService } from '@/domain/@global/class/errors/service';
import { IReturnDefaultDomainGlobal } from '@/domain/@global/types/return-default-domain';

interface IErrorsCreateGym {
  execute(error: Error | unknown): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class ErrorsCreateGym extends Error implements IErrorsCreateGym {
  async execute(error: Error | unknown) {
    return new CustomErrorService().execute(error);
  }
}
