import { IGymGlobal } from '@/domain/@global/types/gym';
import { IReturnDefaultDomainGlobal } from '@/domain/@global/types/return-default-domain';
import { ITypeMessageGlobal } from '@/domain/@global/types/type-message';

interface ISuccessFindGym {
  execute(data: IGymGlobal | null): Promise<
    IReturnDefaultDomainGlobal<{
      gym: IGymGlobal;
    }>
  >;
}

export class SuccessFindGym implements ISuccessFindGym {
  async execute(data: IGymGlobal | null) {
    if (!data?.id) {
      throw new Error('Unexpected: Data is required');
    }

    return {
      data: {
        gym: data,
      },
      message: {
        en: 'Gym found successfully',
        pt: 'Academia encontrada com sucesso',
      },
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: 200,
      error: null,
    };
  }
}
