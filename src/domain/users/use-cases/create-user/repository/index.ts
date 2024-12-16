import { IReturnDefaultRepository } from "@/domain/global/types/return-default-repository";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type IDataCreate = Prisma.UserCreateInput;

type IUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

export class RepositoryCreateUser {
  constructor(private readonly dbAdapter = prisma) {}

  async execute(data: IDataCreate): IReturnDefaultRepository<IUser> {
    const user = await this.dbAdapter.user.findUnique({
      where: { email: data.email },
    });

    if (user) {
      return {
        data: user,
        message: {
          en: "User already exists",
          pt: "Usuário já existe",
        },
        typeMessage: ITypeMessageGlobal.ERROR,
      };
    }

    const newUser = await this.dbAdapter.user.create({
      data,
    });

    return {
      data: newUser,
      message: {
        en: "User created successfully",
        pt: "Usuário criado com sucesso",
      },
      typeMessage: ITypeMessageGlobal.SUCCESS,
    };
  }
}
