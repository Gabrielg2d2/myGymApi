import { ITypeMessageGlobal } from "../types/type-message";

export class CustomErrorService {
  execute(error: Error | unknown | null) {
    return {
      data: null,
      message: {
        en: "Service unavailable, try again later",
        pt: "Serviço indisponível, tente novamente mais tarde",
      },
      typeMessage: ITypeMessageGlobal.FATAL,
      statusCode: 500,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
