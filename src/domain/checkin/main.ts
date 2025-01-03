import {
  ICheckIn,
  IDataRequest,
  RepositoryCheckIn,
} from "./repositories/repository";

interface ICheckInDomain {}

export class CheckInDomain implements ICheckInDomain {
  constructor(private readonly repository = new RepositoryCheckIn()) {}

  async create(data: IDataRequest): Promise<ICheckIn> {
    const newCheckIn = await this.repository.create(data);

    return newCheckIn;
  }
}
