import { IReturnDefaultDomainGlobal } from "@/domain/@global/types/return-default-domain";
import {
  ICheckIn,
  IDataRequest,
  RepositoryCheckIn,
} from "../../repositories/repository";
import { ServiceCheckInAlreadyExistsToday } from "../../services/check-in-already-exists-today";
import { ErrorsCreateCheckIn } from "./returns/errors";
import { SuccessCreateCheckIn } from "./returns/success";

type IReturnCheckInCreate = IReturnDefaultDomainGlobal<{
  checkIn: ICheckIn;
} | null>;

interface ICreateCheckInUseCase {
  execute(data: IDataRequest): Promise<IReturnCheckInCreate>;
}

export type { IDataRequest, IReturnCheckInCreate };

export class CreateCheckInUseCase implements ICreateCheckInUseCase {
  constructor(private readonly repository = new RepositoryCheckIn()) {}

  async execute(data: IDataRequest) {
    try {
      const checkInOnSomeDate = await this.repository.findByUserIdOnDate(
        data.userId,
        new Date()
      );

      await new ServiceCheckInAlreadyExistsToday().execute(checkInOnSomeDate);

      const checkIn = await this.repository.create(data);

      return await new SuccessCreateCheckIn().execute(checkIn);
    } catch (error) {
      return await new ErrorsCreateCheckIn().execute(error);
    }
  }
}
