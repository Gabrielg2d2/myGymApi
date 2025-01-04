import { IFindGym } from "../gyms/main";
import {
  CreateCheckInUseCase,
  IDataRequest,
  IReturnCheckInCreate,
} from "./use-cases/create-checkin/main";

interface ICheckInDomain {
  create(findGym: IFindGym, data: IDataRequest): Promise<IReturnCheckInCreate>;
}

export type { IDataRequest, IReturnCheckInCreate };

export class CheckInDomain implements ICheckInDomain {
  async create(findGym: IFindGym, data: IDataRequest) {
    return await new CreateCheckInUseCase().execute(findGym, data);
  }
}
