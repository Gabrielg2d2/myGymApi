import { CustomErrorService } from "@/domain/@global/class/errors/service";
import { IReturnDefaultDomainGlobal } from "@/domain/@global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/@global/types/type-message";

interface IErrorsFindGym {
  execute(error: Error | unknown): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class ErrorsFindGym extends Error implements IErrorsFindGym {
  async execute(error: Error | unknown) {
    if (error instanceof Error) {
      if (error.message === "Error: Gym not found") {
        return {
          data: null,
          message: {
            en: "Gym not found",
            pt: "Academia não encontrada",
          },
          typeMessage: ITypeMessageGlobal.ERROR,
          statusCode: 404,
          error: null,
        };
      }
    }

    return new CustomErrorService().execute(error);
  }
}
