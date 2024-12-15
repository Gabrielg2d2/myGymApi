import { hash } from "bcryptjs";
import { Repository } from "./repository";

export type ICreateUserUseCase = {
  name: string;
  email: string;
  password: string;
};

export class CreateUserUseCase {
  constructor(private readonly usersRepository = new Repository()) {}

  async execute({ name, email, password }: ICreateUserUseCase) {
    const password_hash = await hash(password, 6);

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    });
  }
}
