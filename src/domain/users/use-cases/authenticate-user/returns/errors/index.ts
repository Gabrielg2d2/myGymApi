import { CustomErrorService } from "@/domain/global/class-custom-error-service";
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
          error: null,
        };
      }
    }

    return new CustomErrorService().execute(null);
  }
}
