import { IReturnDefaultDomainGlobal } from '@/domain/@global/types/return-default-domain';
import { GymsDomain } from '@/domain/gyms/main';
import {
  ICheckIn,
  IDataRequest,
  RepositoryCheckIn,
} from '../../repositories/repository';
import { ServiceCheckInAlreadyExistsToday } from '../../services/check-in-already-exists-today';

import { ServiceCheckUserWithinAllowedSpace } from '../../services/check-user-within-allowed-space';
import { ErrorsCreateCheckIn } from './returns/errors';
import { SuccessCreateCheckIn } from './returns/success';

type IReturnCheckInCreate = IReturnDefaultDomainGlobal<{
  checkIn: ICheckIn;
} | null>;

interface ICreateCheckInUseCase {
  execute(data: IDataRequest): Promise<IReturnCheckInCreate>;
}

export type { IDataRequest, IReturnCheckInCreate };

export class CreateCheckInUseCase implements ICreateCheckInUseCase {
  constructor(
    private readonly repository: RepositoryCheckIn,
    private readonly domainGyms: GymsDomain,
  ) {}

  async execute(data: IDataRequest) {
    try {
      const checkInOnSomeDate = await this.repository.findByUserIdOnDate(
        data.userId,
        new Date(),
      );

      const gym = await this.domainGyms.findGym(data.gymId);

      if (!gym.data?.gym.id) {
        // TODO: Implementar ServiceErrorGymNotFound
        throw new Error('Gym not found');
      }

      await new ServiceCheckUserWithinAllowedSpace().execute(
        {
          latitude: data.userLatitude,
          longitude: data.userLongitude,
        },
        { latitude: gym.data.gym.latitude, longitude: gym.data.gym.longitude },
      );

      await new ServiceCheckInAlreadyExistsToday().execute(checkInOnSomeDate);

      const checkIn = await this.repository.create(data);

      return await new SuccessCreateCheckIn().execute(checkIn);
    } catch (error) {
      return await new ErrorsCreateCheckIn().execute(error);
    }
  }
}
