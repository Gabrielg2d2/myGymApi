import { IReturnDefaultDomainGlobal } from '@/domain/@global/types/return-default-domain';
import { IUserGlobal } from '@/domain/@global/types/user';
import { RepositoryUsers } from '../../repositories/repository';
import { ServiceCreatePasswordHash } from '../../services/create-password-hash';
import { ServiceValidationUserAlreadyExists } from '../../services/validating-user-alredy-exists';
import { ServiceValidationCreateUser } from '../../services/validation-user-creation';
import { ErrorsCreateUser } from './returns/errors';
import { SuccessCreateUser } from './returns/success';

type IDataRequest = {
  name: string;
  email: string;
  password: string;
};

type IDataResponse = IUserGlobal;

type IReturnCreateUserUseCase = Promise<
  IReturnDefaultDomainGlobal<IDataResponse | null>
>;

export type { IDataRequest, IDataResponse, IReturnCreateUserUseCase };

interface ICreateUserUseCase {
  execute(
    body: IDataRequest,
  ): Promise<IReturnDefaultDomainGlobal<IDataResponse | null>>;
}

export class CreateUserUseCase implements ICreateUserUseCase {
  constructor(private readonly repository = new RepositoryUsers()) {}

  async execute(body: IDataRequest) {
    try {
      await new ServiceValidationCreateUser().execute(body);

      const { name, email, password } = body;

      const user = await this.repository.getUserByEmail(email);

      await new ServiceValidationUserAlreadyExists().execute(user);

      const password_hash = await new ServiceCreatePasswordHash().execute(
        password,
      );

      const newUser = await this.repository.createUser({
        name,
        email,
        password: password_hash,
      });

      return await new SuccessCreateUser().execute(newUser);
    } catch (error) {
      return await new ErrorsCreateUser().execute(error);
    }
  }
}
