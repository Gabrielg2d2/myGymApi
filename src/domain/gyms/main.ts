import {
  CreateGymsUseCase,
  IDataRequest,
  IReturnGymsCreate,
} from "./use-cases/create-gym/main";

interface IGymsDomain {
  create(data: IDataRequest): Promise<IReturnGymsCreate>;
}

export type { IDataRequest, IReturnGymsCreate };

export class GymsDomain implements IGymsDomain {
  async create(data: IDataRequest) {
    return await new CreateGymsUseCase().execute(data);
  }
}
