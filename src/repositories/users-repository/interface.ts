import { Prisma } from "@prisma/client";

export type IDataCreate = Prisma.UserCreateInput;
type IUser = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
};

export interface IUsersRepository {
  create(data: IDataCreate): Promise<IUser>;
}
