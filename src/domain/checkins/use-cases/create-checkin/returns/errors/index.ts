import { CustomErrorService } from "@/domain/@global/class/errors/service";
import { IReturnDefaultDomainGlobal } from "@/domain/@global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/@global/types/type-message";

interface IErrorsCreateCheckIn {
  execute(error: Error | unknown): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class ErrorsCreateCheckIn extends Error implements IErrorsCreateCheckIn {
  async execute(error: Error | unknown) {
    if (error instanceof Error) {
      if (error.message === "Error: Check in already done today") {
        return {
          data: null,
          message: {
            en: "You have already checked in today",
            pt: "Você já fez check-in hoje",
          },
          typeMessage: ITypeMessageGlobal.WARNING,
          statusCode: 400,
          error: null,
        };
      }
    }

    return new CustomErrorService().execute(error);
  }
}
