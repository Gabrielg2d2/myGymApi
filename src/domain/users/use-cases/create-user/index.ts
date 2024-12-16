import { hash } from "bcryptjs";
import { RepositoryCreateUser } from "./repository";

export type ICreateUserUseCase = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(
    private readonly repositoryCreateUser = new RepositoryCreateUser()
  ) {}

  async execute({ name, email, password }: ICreateUserUseCase) {
    const password_hash = await hash(password, 6);

    return await this.repositoryCreateUser.execute({
      name,
      email,
      password_hash,
    });
  }
}
