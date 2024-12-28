import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { IDataRequest, IDataResponse } from "../../repositories/interface";
import { RepositoryUsers } from "../../repositories/repository";
import { ErrorsAuthenticateUser } from "./returns/errors";
import { SuccessAuthenticateUser } from "./returns/success";
import { ServiceValidationEmailPassword } from "./services/validating-email-password";
import { ServiceValidationAuthenticateUser } from "./services/validating-user-authentication";

type IReturnAuthenticateUser = Promise<
  IReturnDefaultDomain<{
    user: IDataResponse;
  } | null>
>;

export type { IDataRequest, IDataResponse, IReturnAuthenticateUser };

interface IAuthenticateUserUseCase {
  execute(body: IDataRequest): Promise<
    IReturnDefaultDomain<{
      user: IDataResponse;
    } | null>
  >;
}
export class AuthenticateUserUseCase implements IAuthenticateUserUseCase {
  constructor(private readonly repository = new RepositoryUsers()) {}

  async execute(body: IDataRequest) {
    try {
      const { email, password } = body;

      await new ServiceValidationEmailPassword().execute(email, password);

      const user = await this.repository.getUserByEmail(email);

      await new ServiceValidationAuthenticateUser().execute(user, password);

      return await new SuccessAuthenticateUser().execute({ user });
    } catch (error) {
      return await new ErrorsAuthenticateUser().execute(error);
    }
  }
}
