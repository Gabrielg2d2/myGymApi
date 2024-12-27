import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { IUser } from "../../repository/interface";

export type IDataSuccess = {
  user: IUser;
};
interface ISuccessAuthenticateUser {
  execute(data: IDataSuccess): Promise<
    IReturnDefaultDomain<{
      user: IUser;
    }>
  >;
}

export class SuccessAuthenticateUser
  extends Error
  implements ISuccessAuthenticateUser
{
  async execute(data: IDataSuccess) {
    if (!data.user) {
      throw new Error("Unexpected: Data is required");
    }

    return {
      data: {
        user: data.user,
      },
      message: {
        en: "User authenticated successfully",
        pt: "Usuário autenticado com sucesso",
      },
      typeMessage: ITypeMessageGlobal.SUCCESS,
      statusCode: 200,
      error: null,
    };
  }
}
