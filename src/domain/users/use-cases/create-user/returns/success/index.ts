import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";

export type IDataCreateUser = {
  name: string;
  email: string;
  id: string;
  password_hash: string;
  created_at: Date;
};

export class SuccessCreateUser extends Error {
  execute(data: IDataCreateUser): IReturnDefaultDomain<IDataCreateUser> {
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
