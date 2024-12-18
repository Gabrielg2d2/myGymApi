import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";

export class ErrorsCreateUser extends Error {
  async execute(error: Error | unknown): Promise<IReturnDefaultDomain<null>> {
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

    return {
      data: null,
      message: {
        en: "Service unavailable, try again later",
        pt: "Serviço indisponível, tente novamente mais tarde",
      },
      typeMessage: ITypeMessageGlobal.FATAL,
      statusCode: 500,
      error,
    };
  }
}
