import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { IUser } from "../../repository/interface";

type IDataSuccess = {
  user: IUser;
};
interface ISuccessAuthenticateUser {
  execute(data: IDataSuccess): IReturnDefaultDomain<{
    user: IUser;
  }>;
}

export class SuccessAuthenticateUser
  extends Error
  implements ISuccessAuthenticateUser
{
  execute(data: IDataSuccess) {
    if (!data.user) {
      throw new Error("Data is required");
    }

    return {
      data: {
        user: data.user,
      },
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
