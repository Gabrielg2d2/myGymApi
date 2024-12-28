import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { IUserGlobal } from "@/domain/global/types/user";
import { RepositoryUsers } from "../../repositories/repository";
import { ServiceCreatePasswordHash } from "../../services/create-password-hash";
import { ServiceValidationUserAlreadyExists } from "../../services/validating-user-alredy-exists";
import { ServiceValidationCreateUser } from "../../services/validation-user-creation";
import { ErrorsCreateUser } from "./returns/errors";
import { SuccessCreateUser } from "./returns/success";

type IDataRequest = {
  name: string;
  email: string;
  password: string;
};

type IDataResponse = IUserGlobal;

type IReturnCreateUserUseCase = Promise<
  IReturnDefaultDomain<IDataResponse | null>
>;

export type { IDataRequest, IDataResponse, IReturnCreateUserUseCase };

interface ICreateUserUseCase {
  execute(
    body: IDataRequest
  ): Promise<IReturnDefaultDomain<IDataResponse | null>>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly repository = new RepositoryUsers()) {}

  async execute(body: IDataRequest) {
    try {
      await new ServiceValidationCreateUser().execute(body);

      const { name, email, password } = body;

      const userAlreadyExists = await this.repository.getUserByEmail(email);

      await new ServiceValidationUserAlreadyExists().execute(userAlreadyExists);

      const password_hash = await new ServiceCreatePasswordHash().execute(
        password
      );

      const result = await this.repository.createUser({
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
