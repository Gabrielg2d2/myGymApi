import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { IDataResponse } from "../../repository";

interface ISuccessCreateUser {
  execute(data: IDataResponse): IReturnDefaultDomain<IDataResponse>;
}

export class SuccessCreateUser extends Error implements ISuccessCreateUser {
  execute(data: IDataResponse) {
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
