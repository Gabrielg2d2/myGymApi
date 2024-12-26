import { CustomErrorService } from "@/domain/global/class-custom-error-service";
import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";

interface IErrorsCreateUser {
  execute(error: Error | unknown): Promise<IReturnDefaultDomain<null>>;
}

export class ErrorsCreateUser extends Error implements IErrorsCreateUser {
  async execute(error: Error | unknown) {
    if (error instanceof Error) {
      if (error.message === "Error: Invalid content") {
        return {
          data: null,
          message: {
            en: "Invalid content",
            pt: "Conteúdo inválido",
          },
          typeMessage: ITypeMessageGlobal.ERROR,
          statusCode: 400,
          error,
        };
      }

      if (error.message === "Error: User already exists") {
        return {
          data: null,
          message: {
            en: "User already exists",
            pt: "Usuário já existe",
          },
          typeMessage: ITypeMessageGlobal.ERROR,
          statusCode: 409,
          error,
        };
      }
    }

    return new CustomErrorService().execute(error);
  }
}
