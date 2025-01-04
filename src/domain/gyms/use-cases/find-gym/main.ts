import { IReturnDefaultDomainGlobal } from "@/domain/@global/types/return-default-domain";
import { IGymGlobal, RepositoryGyms } from "../../repositories/repository";
import { ErrorsFindGym } from "./returns/errors";
import { SuccessFindGym } from "./returns/success";

type IReturnFindGym = IReturnDefaultDomainGlobal<{ gym: IGymGlobal } | null>;

interface IFindGymUseCase {
  findGym(gymId: string): Promise<IReturnFindGym>;
}

export class FindGymUseCase implements IFindGymUseCase {
  constructor(private readonly repository = new RepositoryGyms()) {}

  async findGym(gymId: string) {
    try {
      const gym = await this.repository.findById(gymId);

      return await new SuccessFindGym().execute(gym);
    } catch (error) {
      return await new ErrorsFindGym().execute(error);
    }
  }
}
