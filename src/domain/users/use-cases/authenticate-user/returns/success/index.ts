import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { IUserGlobal } from "@/domain/global/types/user";

export type IDataSuccess = {
  user: IUserGlobal;
};
interface ISuccessAuthenticateUser {
  execute(data: IDataSuccess): Promise<
    IReturnDefaultDomain<{
      user: IUserGlobal;
    }>
  >;
}

export class SuccessAuthenticateUser
  extends Error
  implements ISuccessAuthenticateUser
{
  async execute({ user }: IDataSuccess) {
    if (!user.id) {
      new Error("Unexpected: Data is required");
    }

    return {
      data: {
        user,
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
