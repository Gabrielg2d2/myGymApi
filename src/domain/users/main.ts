import { Prisma } from "@prisma/client";
import { IReturnDefaultDomain } from "../global/types/return-default-domain";
import { CreateUserUseCase, ICreateUserUseCase } from "./use-cases/create-user";

interface IUsersDomain {
  createUser(
    body: ICreateUserUseCase
  ): Promise<IReturnDefaultDomain<Prisma.UserCreateInput | null>>;
}

export class UsersDomain implements IUsersDomain {
  async createUser(body: ICreateUserUseCase) {
    return await new CreateUserUseCase().execute(body);
  }
}
