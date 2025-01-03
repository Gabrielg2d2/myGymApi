import {
  CreateCheckInUseCase,
  IDataRequest,
  IReturnCheckInCreate,
} from "./use-cases/create-checkin";

interface ICheckInDomain {
  create(data: IDataRequest): Promise<IReturnCheckInCreate>;
}

export class CheckInDomain implements ICheckInDomain {
  async create(data: IDataRequest) {
    return await new CreateCheckInUseCase().execute(data);
  }
}
