import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { IDataResponse } from "../../repository";

export class SuccessCreateUser extends Error {
  execute(data: IDataResponse): IReturnDefaultDomain<IDataResponse> {
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
