import { IReturnDefaultDomainGlobal } from '@/domain/@global/types/return-default-domain';

import {
  IDataRequest,
  IGymGlobal,
  RepositoryGyms,
} from '../../repositories/repository';
import { ErrorsCreateGym } from './returns/errors';
import { SuccessCreateGym } from './returns/success';

type IReturnCheckInCreate = IReturnDefaultDomainGlobal<{
  gym: IGymGlobal;
} | null>;

interface ICreateGymUseCase {
  execute(data: IDataRequest): Promise<IReturnCheckInCreate>;
}

export type { IDataRequest, IReturnCheckInCreate };

export class CreateGymUseCase implements ICreateGymUseCase {
  constructor(private readonly repository = new RepositoryGyms()) {}

  async execute(data: IDataRequest) {
    try {
      const newGym = await this.repository.create(data);

      return await new SuccessCreateGym().execute(newGym);
    } catch (error) {
      return await new ErrorsCreateGym().execute(error);
    }
  }
}
