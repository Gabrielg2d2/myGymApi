import { hash } from "bcryptjs";
import { RepositoryCreateUser } from "./repository";
import { ServiceValidationCreateUser } from "./services/validation-create-user";

export type ICreateUserUseCase = {
  name: string;
  email: string;
  password: string;
};
export class CreateUserUseCase {
  constructor(
    private readonly repositoryCreateUser = new RepositoryCreateUser()
  ) {}

  async execute(body: ICreateUserUseCase) {
    await new ServiceValidationCreateUser().execute(body);

    const { name, email, password } = body;

    const password_hash = await hash(password, 6);

    return await this.repositoryCreateUser.execute({
      name,
      email,
      password_hash,
    });
  }
}
