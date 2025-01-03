import {
  CreateGymUseCase,
  IDataRequest,
  IReturnCheckInCreate,
} from "./use-cases/create-gym/main";

interface IGymsDomain {
  create(data: IDataRequest): Promise<IReturnCheckInCreate>;
}

export type { IDataRequest, IReturnCheckInCreate };

export class GymsDomain implements IGymsDomain {
  async create(data: IDataRequest) {
    return await new CreateGymUseCase().execute(data);
  }
}
