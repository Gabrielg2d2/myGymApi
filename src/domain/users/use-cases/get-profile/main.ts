import { RepositoryGetProfileUseCase } from "./repository";
import { IDataRequest } from "./repository/interface";
import { ErrorsGetProfile } from "./returns/errors";
import { SuccessGetProfile } from "./returns/success";
import { ServiceUserExists } from "./services/user-exists";

export class GetProfileUseCase {
  constructor(
    private readonly repository = new RepositoryGetProfileUseCase()
  ) {}

  async execute({ userId }: IDataRequest) {
    try {
      const user = await this.repository.execute({ userId });

      await new ServiceUserExists().execute(user);

      return await new SuccessGetProfile().execute(user);
    } catch (error) {
      return await new ErrorsGetProfile().execute(error);
    }
  }
}
