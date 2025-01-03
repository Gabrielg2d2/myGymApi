import {
  CreateCheckInUseCase,
  IDataRequest,
  IReturnCheckInCreate,
} from "./use-cases/create-checkin/main";

interface ICheckInDomain {
  create(data: IDataRequest): Promise<IReturnCheckInCreate>;
}

export type { IDataRequest, IReturnCheckInCreate };

export class CheckInDomain implements ICheckInDomain {
  async create(data: IDataRequest) {
    return await new CreateCheckInUseCase().execute(data);
  }
}
