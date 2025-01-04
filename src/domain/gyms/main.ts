import {
  CreateGymUseCase,
  IDataRequest,
  IReturnCheckInCreate,
} from "./use-cases/create-gym/main";
import { FindGymUseCase, IReturnFindGym } from "./use-cases/find-gym/main";

interface IGymsDomain {
  create(data: IDataRequest): Promise<IReturnCheckInCreate>;
  findGym(gymId: string): Promise<IReturnFindGym>;
}

export type { IDataRequest, IReturnCheckInCreate };

export class GymsDomain implements IGymsDomain {
  async create(data: IDataRequest) {
    return await new CreateGymUseCase().execute(data);
  }

  async findGym(gymId: string) {
    return await new FindGymUseCase().findGym(gymId);
  }
}
