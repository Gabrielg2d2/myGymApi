import { AdapterGetProfileRepository } from "../adapter/repository";
import { IDataRequest, IRepositoryGetProfileUseCase } from "./interface";

export class RepositoryGetProfileUseCase
  implements IRepositoryGetProfileUseCase
{
  constructor(
    private readonly repository = new AdapterGetProfileRepository()
  ) {}

  execute({ userId }: IDataRequest) {
    return this.repository.getUserById(userId);
  }
}
