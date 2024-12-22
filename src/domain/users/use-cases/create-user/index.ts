import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import {
  IDataRequest,
  IDataResponse,
  RepositoryCreateUser,
} from "./repository";
import { ErrorsCreateUser } from "./returns/errors";
import { SuccessCreateUser } from "./returns/success";
import { ServiceCreateHashPassword } from "./services/create-hash-password";
import { ServiceValidationCreateUser } from "./services/validation-create-user";

export class CreateUserUseCase {
  constructor(
    private readonly repositoryCreateUser = new RepositoryCreateUser()
  ) {}

  async execute(
    body: IDataRequest
  ): Promise<IReturnDefaultDomain<IDataResponse | null>> {
    try {
      await new ServiceValidationCreateUser().execute(body);

      const { name, email, password } = body;

      const password_hash = await new ServiceCreateHashPassword().execute(
        password
      );

      const result = await this.repositoryCreateUser.execute({
        name,
        email,
        password: password_hash,
      });

      return new SuccessCreateUser().execute(result);
    } catch (error) {
      return await new ErrorsCreateUser().execute(error);
    }
  }
}
