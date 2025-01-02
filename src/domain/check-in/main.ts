import { RepositoryCheckIn } from "./repositories/repository";

interface ICheckInDomain {}

export class CheckInDomain implements ICheckInDomain {
  constructor(private readonly repository = new RepositoryCheckIn()) {}
}
