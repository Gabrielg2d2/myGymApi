import { IReturnDefaultDomain } from "@/domain/global/types/return-default-domain";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { Prisma } from "@prisma/client";
import { AdapterRepositoryCreateUser } from "../adapters/repository";
import { ErrorsCreateUser } from "./errors";

type IDataCreate = Prisma.UserCreateInput;

export type IDataUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

export class RepositoryCreateUser {
  constructor(private readonly dbAdapter = new AdapterRepositoryCreateUser()) {}

  async execute(data: IDataCreate): IReturnDefaultDomain<IDataUser> {
    try {
      const user = await this.dbAdapter.userFindUnique(data.email);

      if (user) {
        throw new Error("Error: User already exists");
      }

      const newUser = await this.dbAdapter.userCreate(data);

      return {
        data: newUser,
        message: {
          en: "User created successfully",
          pt: "Usuário criado com sucesso",
        },
        typeMessage: ITypeMessageGlobal.SUCCESS,
        statusCode: 201,
      };
    } catch (error: Error | unknown) {
      return new ErrorsCreateUser().execute(error);
    }
  }
}
