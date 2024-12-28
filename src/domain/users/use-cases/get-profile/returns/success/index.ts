import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { IDataResponse } from "../../repository/interface";

interface ISuccessGetProfileResponse {
  execute: (
    user: IDataResponse
  ) => Promise<IReturnDefaultDomain<{ user: IDataResponse } | null>>;
}

export class SuccessGetProfile implements ISuccessGetProfileResponse {
  async execute(user: IDataResponse) {
    if (!user?.id && !user?.created_at)
      throw new Error("Unexpected: Data is not valid");

    return {
      data: {
        user,
      },
      message: {
        en: "User found successfully",
        pt: "Usuário encontrado com sucesso",
      },
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: 200,
      error: null,
    };
  }
}
