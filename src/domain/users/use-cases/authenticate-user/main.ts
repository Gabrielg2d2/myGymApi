import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ServiceValidatingAuthenticatedUser } from "@/domain/users/services/validatiing-authenticated-user";
import { ServiceValidationEmailPassword } from "@/domain/users/services/validating-email-password";
import { IDataRequest, IDataResponse } from "../../repositories/interface";
import { RepositoryUsers } from "../../repositories/repository";
import { ErrorsAuthenticateUser } from "./returns/errors";
import { SuccessAuthenticateUser } from "./returns/success";

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

      await new ServiceValidatingAuthenticatedUser().execute(user, password);

      return await new SuccessAuthenticateUser().execute({ user });
    } catch (error) {
      return await new ErrorsAuthenticateUser().execute(error);
    }
  }
}
