import { IReturnDefaultRepository } from "@/domain/global/types/return-default-repository";
import { ITypeMessageGlobal } from "@/domain/global/types/type-message";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type IDataCreate = Prisma.UserCreateInput;

type IDataUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

export class RepositoryCreateUser {
  constructor(private readonly dbAdapter = prisma) {}

  async execute(data: IDataCreate): IReturnDefaultRepository<IDataUser | null> {
    try {
      const user = await this.dbAdapter.user.findUnique({
        where: { email: data.email },
      });

      if (user) {
        throw new Error("User already exists");
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
        statusCode: 201,
      };
    } catch (error) {
      if (error instanceof Error && error.message === "User already exists") {
        return {
          data: null,
          message: {
            en: error.message,
            pt: error.message,
          },
          typeMessage: ITypeMessageGlobal.ERROR,
          statusCode: 409,
        };
      }

      return {
        data: null,
        message: {
          en: "Error creating user, try again later",
          pt: "Erro ao criar o usuário, tente novamente mais tarde",
        },
        typeMessage: ITypeMessageGlobal.ERROR,
        statusCode: 500,
      };
    }
  }
}
