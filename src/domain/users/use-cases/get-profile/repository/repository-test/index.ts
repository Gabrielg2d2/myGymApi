import { IDataRequest, IRepositoryGetProfileUseCase } from "../interface";

export class RepositoryTestGetProfileUseCase
  implements IRepositoryGetProfileUseCase
{
  private users = [
    {
      id: "987654321",
      name: "Test User",
      email: "test@gmail.com",
      password_hash: new Date().toISOString(),
      created_at: new Date(),
    },
  ];

  async execute({ userId }: IDataRequest) {
    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      return null;
    }

    return user;
  }
}
