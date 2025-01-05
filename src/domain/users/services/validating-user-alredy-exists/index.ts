import { CustomErrorGlobal } from '@/domain/@global/class/errors/custom';
import { IUserGlobal } from '@/domain/@global/types/user';

interface IServiceValidationUserAlreadyExists {
  execute(user: IUserGlobal | null): Promise<void>;
}

export class ServiceValidationUserAlreadyExists
  implements IServiceValidationUserAlreadyExists
{
  async execute(user: IUserGlobal | null) {
    if (user) {
      throw new CustomErrorGlobal({
        message: 'Error: User already exists',
      });
    }
  }
}
