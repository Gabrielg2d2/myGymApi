import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { RepositoryGetProfileUseCase } from "./repository";
import { IDataRequest, IDataResponse } from "./repository/interface";
import { ErrorsGetProfile } from "./returns/errors";
import { SuccessGetProfile } from "./returns/success";
import { ServiceUserExists } from "./services/user-exists";

type IReturnDefaultGetProfile = Promise<
  IReturnDefaultDomain<{ user: IDataResponse } | null>
>;

export type { IDataRequest, IDataResponse, IReturnDefaultGetProfile };

interface IGetProfileUseCase {
  execute(data: IDataRequest): IReturnDefaultGetProfile;
}
export class GetProfileUseCase implements IGetProfileUseCase {
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
