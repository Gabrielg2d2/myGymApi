import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { RepositoryCreateUser } from "./repository";
import { ErrorsCreateUser } from "./returns/errors";
import { IDataCreateUser, SuccessCreateUser } from "./returns/success";
import { ServiceCreateHashPassword } from "./services/create-hash-password";
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

  async execute(
    body: ICreateUserUseCase
  ): Promise<IReturnDefaultDomain<IDataCreateUser | null>> {
    try {
      await new ServiceValidationCreateUser().execute(body);

      const { name, email, password } = body;

      const password_hash = await new ServiceCreateHashPassword().execute(
        password
      );

      const result = await this.repositoryCreateUser.execute({
        name,
        email,
        password_hash,
      });

      return new SuccessCreateUser().execute(result);
    } catch (error) {
      return await new ErrorsCreateUser().execute(error);
    }
  }
}
