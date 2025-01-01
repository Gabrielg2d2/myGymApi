import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { IUserGlobal } from "@/domain/global/types/user";

interface ISuccessCreateUser {
  execute(
    newUser: IUserGlobal | null
  ): Promise<IReturnDefaultDomain<IUserGlobal>>;
}

export class SuccessCreateUser implements ISuccessCreateUser {
  async execute(newUser: IUserGlobal | null) {
    if (!newUser) throw new Error("Unexpect: Data is required");

    return {
      data: newUser,
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
