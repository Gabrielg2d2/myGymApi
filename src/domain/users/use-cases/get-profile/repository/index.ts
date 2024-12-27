import { AdapterGetProfileRepository } from "../adapter/repository";
import { IRepositoryGetProfileUseCase } from "./interface";

export class RepositoryGetProfileUseCase
  implements IRepositoryGetProfileUseCase
{
  constructor(
    private readonly repository = new AdapterGetProfileRepository()
  ) {}

  execute(userId: string) {
    return this.repository.getUserById(userId);
  }
}
