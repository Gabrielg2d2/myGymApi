import { IReturnDefaultDomainGlobal } from "@/domain/@global/types/return-default-domain";
import {
  ICheckIn,
  IDataRequest,
  RepositoryCheckIn,
} from "../../repositories/repository";
import { ErrorsCreateCheckIn } from "./returns/errors";
import { SuccessCreateCheckIn } from "./returns/success";

interface ICreateCheckInUseCase {
  execute(
    data: IDataRequest
  ): Promise<IReturnDefaultDomainGlobal<{ checkIn: ICheckIn } | null>>;
}

export class CreateCheckInUseCase implements ICreateCheckInUseCase {
  constructor(private readonly repository = new RepositoryCheckIn()) {}

  async execute(data: IDataRequest) {
    try {
      const checkIn = await this.repository.create(data);

      return await new SuccessCreateCheckIn().execute(checkIn);
    } catch (error) {
      return await new ErrorsCreateCheckIn().execute(error);
    }
  }
}
