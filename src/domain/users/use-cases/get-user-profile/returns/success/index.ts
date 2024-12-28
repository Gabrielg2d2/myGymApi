import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { IDataResponse, IReturnDefaultGetProfile } from "../../main";

interface ISuccessGetProfileResponse {
  execute: (data: IDataResponse) => IReturnDefaultGetProfile;
}

export class SuccessGetProfile implements ISuccessGetProfileResponse {
  async execute(data: IDataResponse) {
    if (!data?.user?.id && !data?.user?.created_at)
      throw new Error("Unexpected: Data is not valid");

    return {
      data: {
        user: data.user,
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
