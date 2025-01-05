import { CustomErrorGlobal } from '@/domain/@global/class/errors/custom';
import { ICheckIn } from '../../repositories/repository';

export class ServiceCheckInAlreadyExistsToday {
  async execute(data: ICheckIn | null) {
    if (data?.id)
      throw new CustomErrorGlobal({
        message: 'Error: Check in already done today',
      });
  }
}
