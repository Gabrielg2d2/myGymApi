import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { IUserGlobal } from "@/domain/global/types/user";

interface ISuccessCreateUser {
  execute(data: IUserGlobal): IReturnDefaultDomain<IUserGlobal>;
}

export class SuccessCreateUser extends Error implements ISuccessCreateUser {
  execute(data: IUserGlobal) {
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
