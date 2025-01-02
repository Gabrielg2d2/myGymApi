import { IReturnDefaultDomainGlobal } from "@/domain/@global/types/return-default-domain";
import { IUserGlobal } from "@/domain/@global/types/user";
import { ServiceValidatingAuthenticatedUser } from "@/domain/users/services/validatiing-authenticated-user";
import { ServiceValidationEmailPassword } from "@/domain/users/services/validating-email-password";
import { RepositoryUsers } from "../../repositories/repository";
import { ErrorsAuthenticateUser } from "./returns/errors";
import { SuccessAuthenticateUser } from "./returns/success";

type IDataRequest = {
  email: string;
  password: string;
};

type IDataResponse = {
  user: IUserGlobal;
};

type IReturnAuthenticateUser = Promise<
  IReturnDefaultDomainGlobal<{
    user: IUserGlobal;
  } | null>
>;

export type { IDataRequest, IDataResponse, IReturnAuthenticateUser };

interface IAuthenticateUserUseCase {
  execute(body: IDataRequest): IReturnAuthenticateUser;
}
export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(private readonly repository = new RepositoryUsers()) {}

  async execute(body: IDataRequest) {
    try {
      const { email, password } = body;

      await new ServiceValidationEmailPassword().execute(email, password);

      const user = await this.repository.getUserByEmail(email);

      await new ServiceValidatingAuthenticatedUser().execute(user, password);

      return await new SuccessAuthenticateUser().execute({ user });
    } catch (error) {
      return await new ErrorsAuthenticateUser().execute(error);
    }
  }
}
