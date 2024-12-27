import { ITypeMessageGlobal } from "../types/type-message";

/**
 *
 * @description can be used to handle errors globally, allowed to handle only errors
 *
 * @example
 * const customErrorService = new CustomErrorService();
 * const response = customErrorService.execute(null);
 *
 * @returns {object} { data, message, typeMessage, statusCode, error }
 *
 *
 **/
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
