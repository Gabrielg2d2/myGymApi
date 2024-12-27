import { AdapterGetProfileRepository } from "../adapter/repository";

type IUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

interface IRepositoryGetProfileUseCase {
  execute(userId: string): Promise<IUser | null>;
}

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
