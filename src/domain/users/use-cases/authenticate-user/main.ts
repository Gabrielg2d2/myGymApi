import { IDataRequest, RepositoryAuthenticateUser } from "./repository";
import { ErrorsAuthenticateUser } from "./returns/errors";
import { SuccessAuthenticateUser } from "./returns/success";
import { ServiceValidationAuthenticateUser } from "./services/validating-user-authentication";

export class AuthenticateUserUseCase {
  constructor(
    private readonly repositoryAuthenticateUser = new RepositoryAuthenticateUser()
  ) {}

  async execute(body: IDataRequest) {
    try {
      const { email, password } = body;

      const { user } = await this.repositoryAuthenticateUser.execute({
        email,
        password,
      });

      new ServiceValidationAuthenticateUser().execute(user, password);

      return new SuccessAuthenticateUser().execute({ user });
    } catch (error) {
      return await new ErrorsAuthenticateUser().execute(error);
    }
  }
}
