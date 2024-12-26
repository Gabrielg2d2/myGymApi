import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { IDataResponse } from "../../repository";

interface ISuccessAuthenticateUser {
  execute(data: IDataResponse): IReturnDefaultDomain<IDataResponse>;
}

export class SuccessAuthenticateUser
  extends Error
  implements ISuccessAuthenticateUser
{
  execute(data: IDataResponse) {
    if (!data) {
      throw new Error("Data is required");
    }

    return {
      data,
      message: {
        en: "User created successfully",
        pt: "Usuário criado com sucesso",
      },
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: 201,
      error: null,
    };
  }
}