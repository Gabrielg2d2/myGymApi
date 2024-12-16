import { ITypeMessageGlobal } from "@/domain/global/types/type-message";

export class ErrorsCreateUser extends Error {
  execute(error: Error | unknown) {
    if (
      error instanceof Error &&
      error.message === "Error: User already exists"
    ) {
      return {
        data: null,
        message: {
          en: "User already exists",
          pt: "Usuário já existe",
        },
        typeMessage: ITypeMessageGlobal.ERROR,
        statusCode: 409,
      };
    }

    return {
      data: null,
      message: {
        en: "Error creating user, try again later",
        pt: "Erro ao criar o usuário, tente novamente mais tarde",
      },
      typeMessage: ITypeMessageGlobal.ERROR,
      statusCode: 500,
    };
  }
}
