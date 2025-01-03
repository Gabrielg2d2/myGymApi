import { CustomErrorService } from "@/domain/@global/class/errors/service";
import { IReturnDefaultDomainGlobal } from "@/domain/@global/types/return-default-domain";

interface IErrorsCreateCheckIn {
  execute(error: Error | unknown): Promise<IReturnDefaultDomainGlobal<null>>;
}

export class ErrorsCreateCheckIn extends Error implements IErrorsCreateCheckIn {
  async execute(error: Error | unknown) {
    // if (error instanceof Error) {
    //   if (error.message === "Error: Credentials are invalid") {
    //     return {
    //       data: null,
    //       message: {
    //         en: "Credentials are invalid",
    //         pt: "Credenciais inválidas",
    //       },
    //       typeMessage: ITypeMessageGlobal.ERROR,
    //       statusCode: 401,
    //       error: null,
    //     };
    //   }
    // }

    return new CustomErrorService().execute(null);
  }
}
