import { CustomErrorService } from "@/domain/@global/class/errors/service";
import { IReturnDefaultDomainGlobal } from "@/domain/@global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/@global/types/type-message";

interface IErrorsGetProfile {
  execute(error: Error | unknown): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class ErrorsGetProfile extends Error implements IErrorsGetProfile {
  async execute(error: Error | unknown) {
    if (error instanceof Error) {
      if (error.message === "Error: User not found") {
        return {
          data: null,
          message: {
            en: "User not found",
            pt: "Usuário não encontrado",
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
