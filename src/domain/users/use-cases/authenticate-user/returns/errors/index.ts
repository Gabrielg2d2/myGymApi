import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";

interface IErrorsCreateUser {
  execute(error: Error | unknown): Promise<IReturnDefaultDomain<null>>;
}

export class ErrorsAuthenticateUser extends Error implements IErrorsCreateUser {
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
          error, // TODO: remove in production
        };
      }
    }

    return {
      data: null,
      message: {
        en: "Service unavailable, try again later",
        pt: "Serviço indisponível, tente novamente mais tarde",
      },
      typeMessage: ITypeMessageGlobal.FATAL,
      statusCode: 500,
      error: error instanceof Error ? error.message : String(error), // TODO: remove in production
    };
  }
}
