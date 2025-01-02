import { CustomErrorService } from "@/domain/@global/class/errors/service";
import { IReturnDefaultDomainGlobal } from "@/domain/@global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/@global/types/type-message";

interface IErrorsAuthenticateUser {
  execute(error: Error | unknown): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class ErrorsAuthenticateUser
  extends Error
  implements IErrorsAuthenticateUser
{
  async execute(error: Error | unknown) {
    if (error instanceof Error) {
      if (error.message === "Error: Credentials are invalid") {
        return {
          data: null,
          message: {
            en: "Credentials are invalid",
            pt: "Credenciais inválidas",
          },
          typeMessage: ITypeMessageGlobal.ERROR,
          statusCode: 401,
          error: null,
        };
      }
    }

    if (error instanceof Error) {
      if (error.message === "Error: Invalid content") {
        return {
          data: null,
          message: {
            en: "E-mail and password required",
            pt: "E-mail e senha obrigatórios",
          },
          typeMessage: ITypeMessageGlobal.ERROR,
          statusCode: 400,
          error: null,
        };
      }
    }

    return new CustomErrorService().execute(null);
  }
}
